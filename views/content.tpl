<!-- Page.Tpl  -->

@include('partials/header.tpl')
@include('partials/cookieconsent.tpl')
</head>
<body>

	@include('partials/nav.tpl')

	<main role="main">
  		<div class="py-5">
    		<div class="container">
    			@raw($cmscontent)
    		</div>
    	</div>
  </main>

  @include('partials/footer.tpl')
  @include('partials/script.tpl')

</body>
</html>
