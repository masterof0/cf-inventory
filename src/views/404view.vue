<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="not-found">
		<h1>404 - Not Found</h1>
		<p>Sorry, the page you're looking for could not be found.</p>
		<router-link to="/">Go Home</router-link>
	</div>
</template>

<style scoped>
.not-found {
	text-align: center;
	padding: 50px;
}
h1 {
	font-size: 3em;
	margin-bottom: 20px;
}
</style>
