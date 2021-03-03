<template>
	<div>
		<input ref="checkbox" type="checkbox" id="mobile-menu-checkbox">

		<nav role="navigation" class="mobile-menu" style="display: flex; flex-direction: column; height: 100%">
			<h1 style="text-align: center; margin-top: 0; margin-bottom: 0">Menu</h1>
			<ul class="menu" style="flex-grow: 1">
				<router-link class="link" @click.native="toggle" to="/home"><li><span class="link-icon">&#127968;</span> Home</li></router-link>
				<router-link class="link" @click.native="toggle" to="/wifi"><li><span class="link-icon">&#128246;</span> Wifi</li></router-link>
				<router-link class="link" @click.native="toggle" to="/radio"><li><span class="link-icon">&#128225;</span> Radio</li></router-link>
				<router-link class="link" @click.native="toggle" to="/signal"><li><span class="link-icon">&#128225;</span> Signals</li></router-link>
				<router-link class="link" @click.native="toggle" to="/plugins"><li><span class="link-icon">&#129520;</span> Plugins</li></router-link>
				<router-link class="link" @click.native="toggle" to="/services"><li><span class="link-icon">&#127760;</span> Services</li></router-link>
				<router-link class="link" @click.native="toggle" to="/firmware"><li><span class="link-icon">&#128190;</span> Firmware</li></router-link>
			</ul>
			<ul class="menu">
				<router-link class="link" @click.native="toggle" to="/infos"><li>Infos / Credits</li></router-link>
			</ul>
		</nav>

		<label for="mobile-menu-checkbox" id="mobile-menu-overlay"></label>
		<header>
			<label for="mobile-menu-checkbox" id="mobile-menu-btn">
				<span class="menu-link">&#9776;</span>
			</label>
			<div style="display: flex; justify-content: center; flex-direction: column">
				<h2 class="white" style="margin: 0">RFLINK-ESP</h2>
			</div>
		</header>
	</div>
</template>

<script>
	export default {
		name: "Navigation",
		methods: {
			toggle() {
				this.$refs.checkbox.checked = !this.$refs.checkbox.checked
			}
		}
	}
</script>

<style scoped>
	html, body {
		font-family: 'Century Gothic', Sans-serif;
		font-size: 16px;
		line-height: 1.25;
		margin: 0;
		padding: 0;
	}
	#mobile-menu-checkbox {
		display: none;
	}
	#mobile-menu-checkbox:checked ~ #mobile-menu-overlay {
		display: block;
	}
	#mobile-menu-checkbox:checked ~ .mobile-menu {
		visibility: visible;
		-webkit-transform: translate3d(0,0,0);
		transform: translate3d(0,0,0);
	}
	#mobile-menu-overlay {
		background-color: rgba(0,0,0,0.6);
		display: none;
		height: 100%;
		left: 0;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;
	}
	.mobile-menu {
		position: fixed;
		left: 0;
		z-index: 101;
		top: 0;
		visibility: hidden;
		width: 300px;
		height: 100%;
		background: #dcdcdc;
		color: white;
		-webkit-transition: all 0.2s;
		transition: all 0.2s;
		-webkit-transform: translate3d(-100%,0,0);
		transform: translate3d(-100%,0,0);
		padding: 10px;
	}
	.mobile-menu h1 {
		color: black;
	}
	#mobile-menu-btn {
		background-color: transparent;
		border: none;
		color: #222;
		font-size: 30px;
		font-weight: 300;
		left: 0;
		line-height: 1.6em;
		position: relative;
		padding: 0;
		cursor: pointer;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	header {
		background-color: #333;
		padding: .5em;
		display: grid;
		grid-template-columns: auto auto;
		justify-items: stretch;
	}

	header .menu-link {
		color: #fff;
		text-transform: uppercase;
		border: 1px solid white;
		border-radius: 5px;
		padding: 5px 10px;
	}

	.menu {
		list-style: none;
		padding: 0;
		margin-top: 0;
	}
	.menu li {
		padding: 5px;
		line-height: 1.75;
	}

	.menu li:hover {
		background-color: #0002;
	}

	.link {
		text-decoration: none;
		font-size: 1rem;
		color: black;
	}
	.link-icon {
		font-size: 1.125rem;
	}
	.link:visited { color: initial; }
</style>