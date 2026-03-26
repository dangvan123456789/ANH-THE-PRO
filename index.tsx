/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { render, h } from 'preact';
import htm from 'htm';
import { App } from './App';

const html = htm.bind(h);

render(html`<${App} />`, document.getElementById('app')!);
