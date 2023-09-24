// @ts-nocheck
class Snackbar {
	constructor(config) {
		this.runTime = config.runTime;
	}

	info(text, runTime = this.runTime) {
		let x = document.getElementById('info-bar');
		if (x !== null) x.remove();

		/*html*/
		let str = `<div id='info-bar'>${text}</div>`;

		const el = document.createElement('div');
		el.innerHTML = str;
		document.body.appendChild(el.firstElementChild);

		x = document.getElementById('info-bar');
		x.className = 'show';

		setTimeout(function () {
			x.className = x.className.replace('show', '');
		}, runTime);
	}

	confirm(text, callback, config = {}) {
		config.yes = config.yes ?? 'yes';
		config.no = config.no ?? 'no';

		let x = document.getElementById('confirm-bar-wrapper');
		if (x !== null) x.remove();

		let str = ``;

		str += /*html*/ `<div id="confirm-bar-wrapper">`;
		str += /*html*/ `    <div id="confirm-bar">`;
		str += /*html*/ `        <div style="margin-bottom: 6px">${text}</div>`;
		str += /*html*/ `        <div style="display: flex; justify-content: end; gap: 6px; align-items: center">`;
		str += /*html*/ `            <div id="confirm-yes-button" class="core-click">${config.yes}</div>`;
		str += /*html*/ `            <div id="confirm-no-button" class="core-click">${config.no}</div>`;
		str += /*html*/ `        </div>`;
		str += /*html*/ `    </div>`;
		str += /*html*/ `</div>`;

		const el = document.createElement('div');
		el.innerHTML = str;
		document.body.appendChild(el.firstElementChild);

		const self = this;
		document.querySelector('#confirm-bar').addEventListener('click', () => {
			self.misc.closeConfirm();
		});
		document.querySelector('#confirm-yes-button').addEventListener('click', () => {
			if (callback === undefined) return;
			callback();
		});
	}

	misc = {
		closeConfirm: () => {
			document.querySelector('#confirm-bar-wrapper').remove();
		}
	};
}
export const snack = new Snackbar({
	runTime: 3000
});
