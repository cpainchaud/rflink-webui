<template>
	<div class="tooltip" style="display: inline; margin: 0px 4px">
		<span class="tooltip_title">
			<span class="icon " :class="[ 'icon-'+icon ]">Caution: </span>
		</span>
		<span class="tooltip_text">
			<slot></slot>
		</span>
	</div>
</template>

<script>
	export default {
		name: "Icon",
		props: {
			icon: {
				required: true
			}
		}
	}
</script>

<style scoped>
	/* Tooltip container */
	.tooltip {
		position: relative;
		display: inline-block;
		width: 100%;
	}

	.tooltip .tooltip_title {
		/*border-bottom: 1px dotted #000000; !* If you want dots under the hoverable text *!*/
		cursor: pointer;
	}

	/* Tooltip text */
	.tooltip .tooltip_text {
		visibility: hidden;
		width: 200px;
		background-color: #333;
		border: 2px solid #585858;
		color: #ffffff;
		text-align: center;
		padding: 8px;
		border-radius: 6px;

		/* Position the tooltip text - see examples below! */
		position: absolute;
		z-index: 1;
		bottom: 175%;
		left: 50%;
		transform: translateX(-50%);
		margin-left: -65px; /* Use half of the width (120/2 = 60), to center the tooltip */
	}
	.tooltip .tooltip_text::after {
		content: " ";
		position: absolute;
		top: 100%; /* At the bottom of the tooltip */
		right: 37px;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: black transparent transparent transparent;
	}

	/* Show the tooltip text when you mouse over the tooltip container */
	.tooltip:hover .tooltip_text {
		visibility: visible;
	}

	.tooltip .tooltip_text {
		opacity: 0;
		transition: opacity 0.25s;
	}

	.tooltip:hover .tooltip_text {
		opacity: 1;
	}


	.icon, .icon::before, .icon::after {
		position: relative;
		padding: 0;
		margin: 0;
	}

	.icon {
		font-size: 24px;
		color: transparent;
	}

	.icon.icon-warning {
		display: inline-block;

		top: 0.225em;

		width: 1.15em;
		height: 1.15em;

		overflow: hidden;
		border: none;
		background-color: transparent;
		border-radius: 0.625em;
	}

	.icon.icon-warning::before {
		content: "";
		display: block;
		top: -0.08em;
		left: 0.0em;
		position: absolute;
		border: transparent 0.6em solid;
		border-bottom-color: #ffc533;
		border-bottom-width: 1em;
		border-top-width: 0;
		box-shadow: #999 0 1px 1px;
	}

	.icon.icon-warning::after {
		display: block;
		position: absolute;
		top: 0.3em;
		left: 0;
		width: 100%;
		padding: 0 1px;
		text-align: center;
		content: "!";
		font-size: 0.65em;
		font-weight: bold;
		color: #333333;
	}

	.icon.icon-notice,
	.icon.icon-success,
	.icon.icon-error
	{
		display: inline-block;
		top: 0.15em;
		width: 1em;
		height: 1em;

		overflow: hidden;
		border: none;
		border-radius: 0.5em;
		box-shadow: #999 0 1px 1px;
	}

	.icon.icon-notice::after,
	.icon.icon-success::after,
	.icon.icon-error::after
	{
		display: block;
		position: absolute;
		top: 0.25em;
		left: 0;
		width: 100%;
		text-align: center;
		font-family: "Times New Roman", "Garamond", serif;
		font-size: 0.65em;
		color: white;
	}

	.icon.icon-notice {
		background-color: #45a0ff;
	}
	.icon.icon-notice::after {
		font-weight: bold;
		content: "i";
	}


	.icon.icon-success {
		background-color: #393;
	}
	.icon.icon-success::after {
		left: 0.012em;
		content: "✓";
	}

	.icon.icon-error {
		background-color: #933;
	}
	.icon.icon-error::after {
		content: "×";
		font-weight: bold;
	}
</style>