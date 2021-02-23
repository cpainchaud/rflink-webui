<template>
	<div>
		<h1 style="text-align: center;">Firmware</h1>
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
	export default {
		name: "Firmware"
	}
</script>

<style scoped>
	@import url(../assets/components.css);

	.container {
		//background-color: crimson;

		border: 1px solid #0006;
		border-radius: 5px;

		width: calc(100% - 7px *2);

		padding: 5px;
		margin: 15px 3px;
	}


</style>