<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8">

	<title>Contact - Alasdair Smith | 40 Thieves</title>

	<meta name="description" content="AlasdairSmith.co.uk/.org.uk is the website of Alasdair Smith, a full stack web developer working in Portsmouth, UK">
	<meta name="author" content="Alasdair Smith">

	<link rel="author" href="humans.txt">

	<link rel="shortcut icon" type="image/png" href="../assets/img/favicon.png">
	<link rel="shortcut icon apple-touch-icon" type="image/png" href="../assets/img/favicon-300.png">

	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- Want a nicely formatted repo? -->
	<!-- Check the Github: https://github.com/40thieves/alasdairsmith.org.uk -->
	<!-- Or have some questions? alasdairsmith100 [at] gmail [dot] com -->
	<link rel="stylesheet" href="../assets/css/style.css">

	<style>
		main {
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  margin: 1.5em;
		}

		p {
		  width: 60%;
		  text-align: center;
		  line-height: 1.5em;
		  margin-bottom: 0em;
		}

		p:last-of-type {
		  margin-bottom: 1em;
		}

		svg {
		  background: linear-gradient(#F3F4F8 20%, #8E9EB5);
		  width: 40%;
		}

		svg * {
		  stroke: #524c4c;
		  stroke-width: 1px;
		  stroke-linejoin: round;
		}

		#speech-bubble {
		  fill: #fff;
		  stroke: #000;
		}

		#head {
		  fill: #f9ddc6;
		}

		#dress-top, #dress-bottom, #left-arm, #right-arm {
		  fill: #fff;
		}

		#gun * {
		  stroke: #000;
		  stroke-linejoin: miter;
		}

		#hair * {
		  fill: #3e2913;
		  stroke: #513619;
		}
	</style>
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
</header>

<main>
	<h1>Amy...</h1>

	<svg viewBox="0 0 200 250">
		<g>
		  <g>
			<g id="speech-bubble">
				<rect x="10" y="10" width="107" height="40" rx="10" ry="12" />
				<path
				  d="
					M 20 49
					a 40 20 0 0 0 20 22
					A 10  5 -90 0 1 40 49
				  "
				  fill="#fff"
				 />
			</g>
			<text x="64" y="36" text-anchor="middle">Thank you 💙</text>
		  </g>

		  <g id="leia" transform="translate(0, 50)">
			<polygon
			  points="
				83  60,
				118 60,
				123 110,
				78  110
			  "
			  id="dress-top"
			/>

			{/* Order switched to change z-index */}
			<circle cx="100" cy="42" r="20" id="head" />

			<g id="hair">
			  <path
				d="
				  M80 42
				  A20 20 0 0 1 120 42
				  A40 30 0 0 1 100 33
				  A40 30 0 0 1 80  42
				"
			  />
			  <ellipse
				cx="80"
				cy="42"
				rx="4"
				ry="12"
			  />
			  <ellipse
				cx="120"
				cy="42"
				rx="4"
				ry="12"
			  />
			</g>

			<polygon
			  points="
				79  110,
				122 110,
				132 180,
				69  180
			  "
			  id="dress-bottom"
			/>

			<polygon
			  points="
				83 60,
				60 80,
				79 125,
				81 100,
				74 84,
				81.5 76
			  "
			  id="left-arm"
			/>

			<g id="gun">
			  <rect width="70" height="10" transform="translate(124, 67) rotate(-48)" />
			  <rect width="10" height="13" transform="translate(140, 65) rotate(-48)" />
			</g>

			<polygon
			  points="
				118 60,
				132 81,
				140 45,
				150 59,
				133 103,
				120 78
			  "
			  id="right-arm"
			/>
		  </g>
		</g>
	</svg>

	<p>Thank you for being so wonderful and for putting so much effort into my gift. This is just a (very small) way of saying how much I appreciate it.</p>
	<p>Sorry that it's just digital and nowhere near as lovely as yours is.</p>
</main>

</body>
</html>