<!-- Contactus.Tpl -->

<div class="row">
	<div class="col-md-6">
	  	<h1>@(Q::uStr('30:Contact me'))</h1>		
		<img src="/views/img/blog.png" class="img-fluid" />
	  	<p>@(Q::uStr('31:I would love to hear from you'))</p>		
	</div>
	<div class="col-md-6">
	  	<form action="https://formspree.io/info@@markrichards.xyz" method="POST">
	  		<!-- Hidden inputs -->
	  		<input type="hidden" name="_language" value="@($idiom)" />
	  		<input type="hidden" name="_cc" value="mark@@webcliq.com" />

	  		<!-- Sender's name -->
	    	<div class="form-group"> 
	    		<label for="InputName">@(Q::uStr('18:Your name'))</label>
	      		<input type="text" required autofocus class="form-control" name="name" id="InputName" placeholder="@(Q::uStr('18:Your name'))"> 
	      	</div>

	      	<!-- Sender's email address -->
	    	<div class="form-group"> 
	    		<label for="InputEmail">@(Q::uStr('19:Your email address'))</label>
	      		<input type="email" required class="form-control" name="_replyto" id="InputEmail" placeholder="name@@domain.com">
	      	</div>

	      	<!-- Subject for their email -->
	    	<div class="form-group"> 
	    		<label for="InputSubject">@(Q::uStr('20:Subject'))</label>
	      		<input type="text" required class="form-control" name="_subject" id="InputSubject" placeholder="@(Q::uStr('20:Subject'))"> 
	      	</div>

	      	<!-- Their message -->
	    	<div class="form-group"> 
	    		<label for="textmessage">@(Q::uStr('21:Your message'))</label> 
	    		<textarea class="form-control" required name="_message" id="textmessage" rows="8" placeholder="@(Q::uStr('9:Type here'))"></textarea> 
	    	</div>
	    <button type="submit" class="btn btn-secondary">@(Q::uStr('22:Send'))</button>
	  </form>
	  
	</div>
</div>