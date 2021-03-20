<template>
	<div class="app">
		<div class="menu" :style="menu_container">
			<nav role="navigation" class="mobile-menu" style="display: flex; flex-direction: column; height: 100%">
				<div>
					<h1 style="text-align: center; margin-top: 0; margin-bottom: 0">Menu</h1>
				</div>
				<ul class="menu-cat" style="flex-grow: 1">
					<router-link class="link" @click.native="toggle" to="/home"><li><span class="link-icon">&#127968;</span> Home</li></router-link>
					<router-link class="link" @click.native="toggle" to="/wifi"><li><span class="link-icon">&#128246;</span> Wifi</li></router-link>
					<router-link class="link" @click.native="toggle" to="/radio"><li><span class="link-icon">&#128225;</span> Radio</li></router-link>
					<router-link class="link" @click.native="toggle" to="/signal"><li><span class="link-icon">&#128225;</span> Signals</li></router-link>
					<router-link class="link" @click.native="toggle" to="/plugins"><li><span class="link-icon">&#129520;</span> Plugins</li></router-link>
					<router-link class="link" @click.native="toggle" to="/services"><li><span class="link-icon">&#127760;</span> Services</li></router-link>
					<router-link class="link" @click.native="toggle" to="/firmware"><li><span class="link-icon">&#128190;</span> Firmware</li></router-link>
				</ul>
				<ul class="menu-cat">
					<router-link class="link" @click.native="toggle" to="/infos"><li>Infos / Credits</li></router-link>
				</ul>
			</nav>
		</div>
		<div class="menu-backdrop" :style="menu_backdrop" @click="toggle"></div>


		<!-- Page container -->
		<div class="page" :style="page_container">
			<div class="navbar">
				<input ref="checkbox" v-model="navbar_open" type="checkbox" id="menu-checkbox">
				<label for="menu-checkbox" id="mobile-menu-overlay"></label>
				<header>
					<div>
						<label v-if="this.windowWidth <= this.navbar_breakpoint" for="menu-checkbox">
							<span class="menu-link">&#9776;</span>
						</label>
					</div>
					<div style="display: flex; justify-content: center; flex-direction: column">
						<h2 class="white" style="margin: 0; text-align: center">{{ title }}</h2>
					</div>
					<div class="menu-btn-container">
						<button @click="$root.$emit('reload_btn')" class="menu-btn">&#128472;</button>
					</div>
				</header>
			</div>

			<div class="page-slot-container" style="">
				<slot></slot>
			</div>
		</div>
		<VueTitle :title="title"></VueTitle>
	</div>
</template>

<script>
	import VueTitle from "./VueTitle";
	import axios from "axios";
	export default {
		name: "Navigation",
		components: {VueTitle},
		data() {
			return {
				windowWidth: window.innerWidth,
				navbar_open: false,
				navbar_breakpoint: 992,
				navbar_width: 290,
				hostname: "",
				ip: "",
			}
		},
		mounted() {
			window.addEventListener('resize', () => {
				this.windowWidth = window.innerWidth
				if(window.innerWidth<992) this.navbar_open = false
			})

			setInterval(()=>{
				axios.get("/api/status").then(response => {
					this.ip = response.data.network.wifi_client.ip
				}).catch(console.error);

				axios.get("/api/config").then(response => {
					this.hostname = response.data.wifi.client_hostname
				}).catch(console.error);
			},60000)
		},
		computed: {
			title() {
				let out = "RFLink-ESP"
				if(this.hostname) out += " | "+this.hostname
				if(this.ip) out += " ("+this.ip+")"
				return out
			},
			page_container() {
				return {
					left: this.windowWidth > this.navbar_breakpoint ? this.navbar_width+"px" : "0",
					width: this.windowWidth > this.navbar_breakpoint ? "calc(100% - "+this.navbar_width+"px)" : "100%"
				}
			},
			menu_container() {
				return {
					width: this.navbar_width+"px",
					left: this.windowWidth > this.navbar_breakpoint ? "0" : (this.navbar_open ? "0" : "-100%")
				}
			},
			menu_backdrop() {
				return {
					display: this.windowWidth > this.navbar_breakpoint ? "none" : (this.navbar_open ? "block" : "none"),
					opacity: this.windowWidth > this.navbar_breakpoint ? "0%" : (this.navbar_open ? "100%" : "0%")
				}
			}
		},
		methods: {
			toggle() {
				this.navbar_open = !this.navbar_open
			}
		}
	}
</script>

<style scoped>
	.app {
		display: flex;
		flex-direction: row;
		height: 100vh;
	}
	.menu {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 20;
		background-color: white;
		height: 100vh;
		transition: all 0.25s;
	}
	.menu-backdrop {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		background-color: #0008;
		height: 100vh;
		width: 100%;
		transition: all 0.4s;
	}
	.page {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.page-slot-container {
		height: calc(100% - 32px - 46px);
		overflow-y: auto;
		padding: 8px;
	}

	.navbar > header {
		background-color: #333;
		padding: .5em;
		display: grid;
		grid-template-columns: auto auto auto;
		justify-items: stretch;
	}
	.navbar > header .menu-link {
		color: #fff;
		text-transform: uppercase;
		border: 1px solid white;
		border-radius: 5px;
		padding: 5px 10px;
	}

	.navbar > header > .menu-btn-container {
		padding-bottom: 5px;
		display: grid;
		grid-template-columns: auto;
		justify-items: right;
	}
	.navbar > header > .menu-btn-container > .menu-btn {
		color: #fff;
		font-size: 25px;
		background-color: transparent;
		border: 1px solid white;
		border-radius: 5px;
		padding: 0px 15px;
		height: 100%;
		width: auto;
	}
	#menu-checkbox {
		display: none;
	}

	.menu > nav > div {
		background-color: #585858;
		height: calc(16px + 46px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #fff;
	}
	.menu > nav > ul  {
		background-color: #a8a7a7;
		padding: .5em 0px;
		color: #fff;
	}
	.link > li  {
		padding: 10px;
		margin-top: 0px;
	}
	.link > li:hover {
		background-color: #0002;
	}
	.link {
		text-decoration: none;
		font-size: 1rem;
		color: black;
	}
	.link-icon {
		font-size: 1.2rem;
	}

	.menu-link {
		font-size: 30px;
	}
</style>