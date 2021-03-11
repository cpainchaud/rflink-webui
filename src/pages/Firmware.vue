<template>
	<div>
		<h1 class="page-title" style="text-align: center;">Firmware</h1>
		<div class="container">
			<h2 style="margin: 5px 0;">OTA</h2>
			<table>
				<tr>
					<td>Enable OTA over wifi</td>
					<th><label class="switch" style="margin: 0 5px">
						<input type="checkbox">
						<span class="slider round"></span>
					</label></th>
				</tr>
				<tr>
					<td>OTA Password</td>
					<th><label>
						<input required placeholder="**********" type="password">
					</label></th>
				</tr>
			</table>
			<input type="submit" class="btn-green" value="Save">
		</div>

		<div class="container">
			<h2 style="margin: 5px 0 15px 0;">Update via upload</h2>

			<input ref="file" style="margin-bottom: 5px; margin-right: 10px; display: inline-block" type="file" id="myfile" v-on:change="handleFileUpload" name="myfile">
			<span v-if="file !== null" style="padding: 0; margin: 5px 0 10px 0;">{{ file.name }}</span>
			<p v-if="md5 !== ''" style="padding: 0; margin: 5px 0 10px 0;"><b>MD5:</b> {{ md5 }}</p>

			<Progress v-if="uploadPercentage>0" :percentage="this.uploadPercentage"></Progress>
			<input type="submit" @click="submitFile" class="btn-green" value="Flash">
		</div>

		<div class="container">
			<h2 style="margin: 5px 0 15px 0;">Update via HTTP URL</h2>
				<tr>
					<td>Firmware URL</td>
					<th><label>
						<input required placeholder="https://my.url/here" type="text">
					</label></th>
				</tr>

			<input type="submit" class="btn-green" value="Flash">
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import {api_mixin} from "../api_mixin";
	import Swal from "sweetalert2";
	import Progress from "../components/Progress";
	import BMF from 'browser-md5-file';

	const bmf = new BMF();

	export default {
		name: "Firmware",
		components: {Progress},
		mixins: [api_mixin],
		data() {
			return {
				uploadPercentage: 0,
				md5: "",
				file: null
			}
		},
		methods: {
			handleFileUpload(){
				this.file = this.$refs.file.files[0];
				console.log(this.file)
				bmf.md5(this.file, (err, md5) => {
					this.md5 = md5
				}, progress => {
					if(progress<1) this.md5 = "Calculating " + Math.round(progress*10000)/100 + "%";
				});
			},
			submitFile(){
				if(this.file == null) {
					return Swal.fire({
						title: 'Error!',
						html: 'You didn\'t select a file',
						icon: 'error',
						confirmButtonText: 'Continue'
					})
				}

				let formData = new FormData();

				formData.append('upload', this.file);
				formData.append('md5', this.md5);

				axios.post( '/api/firmware/update', formData, {
						headers: { 'Content-Type': 'multipart/form-data' },
						onUploadProgress: function( progressEvent ) {
							this.uploadPercentage = progressEvent.loaded / progressEvent.total;
						}.bind(this)
					}
				).then(function(){
					Swal.fire({
						title: 'Success!',
						html: 'Operation is a success, the esp will now reboot',
						icon: 'success',
						confirmButtonText: 'Reload'
					}).then(() => {
						window.reload()
					})
				}).catch(error => {
					console.error(error)
					Swal.fire({
						title: 'Error!',
						html: 'A network error occured while saving: '+error,
						icon: 'error',
						confirmButtonText: 'Continue'
					})
				});
			},
		}
	}
</script>

<style scoped>
	@import url(../assets/components.css);




</style>
