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
			<h2 style="margin: 5px 0 15px 0;">Upload update</h2>

			<input type="file" id="myfile" name="myfile"><br><br>

			<input type="submit" class="btn-green" value="Flash">
		</div>
	</div>
</template>

<script>
	import {api_mixin} from "../api_mixin";

	export default {
		name: "Firmware",
		mixins: [api_mixin],
	}
</script>

<style scoped>
	@import url(../assets/components.css);




</style>