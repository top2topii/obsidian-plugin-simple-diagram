'use strict';

/*
 * Simple Diagram — Obsidian plugin
 *
 * ```diagram
 * title: 권장 아키텍처
 * 현장 클라이언트 | PDF 10~50개 일괄 업로드
 * -> HTTP
 * [blue] Redis + BullMQ | 대기열 · 재시도
 * Worker A ;; Worker B
 * ```
 *
 * Plain CommonJS so it can be dropped into .obsidian/plugins without a build step.
 */

const { Plugin } = require('obsidian');

const COLORS = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'pink', 'gray', 'accent', 'plain'];
const SVG_NS = 'http://www.w3.org/2000/svg';

// ---------------------------------------------------------------------------
// Parser
// ---------------------------------------------------------------------------

function indentOf(line) {
  return line.length - line.replace(/^\s+/, '').length;
}

function parseNode(text) {
  let color = null;
  const m = text.match(/^\[([a-z]+)\]\s*/i);
  if (m && COLORS.includes(m[1].toLowerCase())) {
    color = m[1].toLowerCase();
    text = text.slice(m[0].length);
  }
  const parts = text.split('|').map((s) => s.trim());
  return { title: parts[0], desc: parts.slice(1).filter(Boolean), color };
}

function parseDiagram(source) {
  const diagram = { title: null, direction: 'down', rows: [], edges: [] };
  let pendingEdge = null;
  let lastRow = null;
  let lastIndent = 0;

  for (const raw of source.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('%%') || line.startsWith('//')) continue;

    const opt = line.match(/^(title|direction|dir)\s*:\s*(.*)$/i);
    if (opt) {
      const key = opt[1].toLowerCase();
      if (key === 'title') diagram.title = opt[2];
      else diagram.direction = /^(right|lr|horizontal|h|row)$/i.test(opt[2]) ? 'right' : 'down';
      continue;
    }

    const edge = line.match(/^(->|-->|=>|\.\.>)\s*(.*)$/);
    if (edge) {
      pendingEdge = { label: edge[2], dashed: edge[1] === '-->' || edge[1] === '..>' };
      continue;
    }

    // Deeper-indented line right after a node: extra description line for the last node in that row.
    const indent = indentOf(raw);
    if (lastRow && !pendingEdge && indent > lastIndent) {
      lastRow[lastRow.length - 1].desc.push(line);
      continue;
    }

    const row = line.split(/\s*;;\s*/).filter(Boolean).map(parseNode);
    if (diagram.rows.length) diagram.edges.push(pendingEdge || { label: '', dashed: false });
    diagram.rows.push(row);
    pendingEdge = null;
    lastRow = row;
    lastIndent = indent;
  }

  return diagram;
}

// ---------------------------------------------------------------------------
// Renderer (plain DOM, no Obsidian helpers, so it also runs in demo.html)
// ---------------------------------------------------------------------------

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = text;
  return node;
}

function arrowSvg(direction, dashed) {
  const horizontal = direction === 'right';
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'sd-arrow');
  svg.setAttribute('viewBox', horizontal ? '0 0 24 12' : '0 0 12 24');
  svg.setAttribute('width', horizontal ? '24' : '12');
  svg.setAttribute('height', horizontal ? '12' : '24');
  svg.setAttribute('aria-hidden', 'true');

  const line = document.createElementNS(SVG_NS, 'path');
  line.setAttribute('d', horizontal ? 'M1 6 H21' : 'M6 1 V21');
  if (dashed) line.setAttribute('stroke-dasharray', '3 3');
  const head = document.createElementNS(SVG_NS, 'path');
  head.setAttribute('d', horizontal ? 'M16 2 L22 6 L16 10' : 'M2 16 L6 22 L10 16');

  for (const p of [line, head]) {
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'currentColor');
    p.setAttribute('stroke-width', '1.5');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(p);
  }
  return svg;
}

function renderNode(node) {
  const box = el('div', 'sd-node' + (node.color ? ' sd-c-' + node.color : ''));
  box.appendChild(el('div', 'sd-node-title', node.title));
  for (const d of node.desc) box.appendChild(el('div', 'sd-node-desc', d));
  return box;
}

function renderDiagram(source, container) {
  const diagram = parseDiagram(source);
  const wrap = el('div', 'sd-wrap');

  if (diagram.title) wrap.appendChild(el('div', 'sd-title', diagram.title));

  if (!diagram.rows.length) {
    wrap.appendChild(el('div', 'sd-empty', 'diagram: no nodes to display.'));
    container.appendChild(wrap);
    return;
  }

  const frame = el('div', 'sd-frame sd-dir-' + diagram.direction);
  diagram.rows.forEach((row, i) => {
    if (i > 0) {
      const edge = diagram.edges[i - 1];
      const edgeEl = el('div', 'sd-edge');
      edgeEl.appendChild(arrowSvg(diagram.direction, edge.dashed));
      if (edge.label) edgeEl.appendChild(el('span', 'sd-edge-label', edge.label));
      frame.appendChild(edgeEl);
    }
    const rowEl = el('div', 'sd-row');
    row.forEach((node) => rowEl.appendChild(renderNode(node)));
    frame.appendChild(rowEl);
  });

  wrap.appendChild(frame);
  container.appendChild(wrap);
}

// ---------------------------------------------------------------------------
// Plugin
// ---------------------------------------------------------------------------

class SimpleDiagramPlugin extends Plugin {
  async onload() {
    this.registerMarkdownCodeBlockProcessor('diagram', (source, container) => {
      renderDiagram(source, container);
    });
  }
}

module.exports = SimpleDiagramPlugin;
module.exports.parseDiagram = parseDiagram;
module.exports.renderDiagram = renderDiagram;
