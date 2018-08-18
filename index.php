<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8">

	<title>Alasdair Smith | 40 Thieves</title>

	<meta name="description" content="AlasdairSmith.co.uk/.org.uk is the website of Alasdair Smith, a full stack web developer working in Portsmouth, UK">
	<meta name="author" content="Alasdair Smith">

	<link rel="author" href="humans.txt">

	<link rel="shortcut icon" type="image/png" href="assets/img/favicon.png">
	<link rel="shortcut icon apple-touch-icon" type="image/png" href="assets/img/favicon-300.png">

	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- Want a nicely formatted repo? -->
	<!-- Check the Github: https://github.com/40thieves/alasdairsmith.org.uk -->
	<!-- Or have some questions? alasdairsmith100 [at] gmail [dot] com -->
	<link rel="stylesheet" href="assets/css/style.min.css">
	<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
</head>
<body>
<header id="banner" role="banner">
	<div class="color-bar" aria-hidden="true">
		<div id="color1"></div>
		<div id="color2"></div>
		<div id="color3"></div>
		<div id="color4"></div>
		<div id="color5"></div>
		<div id="color6"></div>
		<div id="color7"></div>
		<div id="color8"></div>
		<div id="color9"></div>
		<div id="color10"></div>
	</div>

	<h1 id="logo" class="logo wrap wide">
		<a href="/">
			<span class="name">Alasdair <span class="thin caps">Smith</span></span>
			<span class="pipe" aria-hidden="true"></span>
			<span class="nick">40 <span class="thin caps">Thieves</span></span>
		</a>
	</h1>

	<div id="avatar" class="avatar wrap">
		<div class="avatar-wrapper">
			<img src="assets/img/avatar.jpg" alt="Alasdair Smith">
		</div>
	</div>
</header>

<main id="content" role="main" class="wrap clearfix">
	<section class="about">
		<p>Hi, I'm Alasdair Smith, although I usually go by Ali, and I'm a web developer working in London, UK.</p>

		<p>I'm a web developer for <a href="https://www.overleaf.com">Overleaf</a>, specialising in frontend, and advocating for open science. I mentor at <a href="https://codeyourfuture.io/">CodeYourFuture</a>. I enjoy watching F1, Scouting, hiking, camping and playing Ultimate.</p>
	</section>

	<nav class="links">
		<ul>
			<li><a href="http://40thiev.es" id="blog" rel="me">Blog</a></li>
			<li><a href="mailto:alasdairsmith100@gmail.com" id="email">Email</a></li>
			<li><a href="http://twitter.com/40_thieves" id="twitter" rel="me">Twitter</a></li>
			<li><a href="https://github.com/40thieves" id="github" rel="me">Github</a></li>
		</ul>
	</nav>
</main>

<footer role="contentinfo">
	<div class="wrap wide clearfix">
		<p><a href="contact">Contact</a>
		<p>Content &copy; Alasdair Smith <?php echo (new DateTime)->format('Y'); ?>.</p>
		<p><a href="https://github.com/40thieves/alasdairsmith.org.uk">Code</a> released under an MIT license.</p>
	</div>
</footer>

<script type="text/javascript" src="assets/js/leet.js"></script>
<script>
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function() {
			navigator.serviceWorker.register('assets/js/sw.js')
		})
	}
</script>
</body>
</html>