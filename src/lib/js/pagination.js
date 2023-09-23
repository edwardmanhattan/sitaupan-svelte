// @ts-nocheck
export class Pagination {
	root;
	interval;
	page;

	constructor(root = [], interval = 10, anchor = 0) {
		this.root = root;
		this.interval = interval;
		this.page = anchor;
		this.pageLength = Math.ceil(this.root.length / this.interval) - 1;
	}

	next() {
		if (this.page + 1 > this.pageLength) this.page = 0;
		else this.page++;

		return this.chop();
	}

	getCurrentPage() {
		return this.page + 1;
	}

	prev() {
		if (this.page - 1 < 0) this.page = this.pageLength;
		else this.page--;

		return this.chop();
	}

	jump() {
		this.page = 0;
		return this.chop();
	}

	setRoot(root) {
		this.root = root;
		this.page = 0;
		this.pageLength = Math.ceil(this.root.length / this.interval) - 1;
		return this.chop();
	}

	setInterval(interval) {
		this.interval = interval;
		this.page = 0;
		this.pageLength = Math.ceil(this.root.length / this.interval) - 1;
		return this.chop();
	}

	chop() {
		this.dataCount = 0;
		const temp = [];
		for (let i = this.interval * this.page; i < this.interval * this.page + this.interval; i++) {
			if (this.root[i] === undefined) break;
			this.root[i] = { pageNum: i + 1, ...this.root[i] };
			temp.push(this.root[i]);
			this.dataCount++;
		}
		return temp;
	}
}
