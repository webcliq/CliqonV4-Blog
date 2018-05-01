</body>
</html>

<!-- start sidenavi wrapper// -->
<div id="sideNavi">
    <!-- sidenavi menu //-->
    <div class="side-navi-item-default"></div>
    <div class="side-navi-item item1"><div>@(Q::cStr('288:Categories'))</div></div>
    <div class="side-navi-item item2"><div>@(Q::cStr('574:Tags'))</div></div>
    <div class="side-navi-item item3"><div>@(Q::cStr('149:Search'))</div></div>
    <div class="side-navi-item item4"><div>@(Q::cStr('85:Help'))</div></div>
    <!-- sidenavi data //-->
    <div class="side-navi-data" id="sideNaviData">
        
        <!-- Select by category -->
        <div class="side-navi-tab">
            <div class="pad">
            	<h3>@(Q::cStr('575:Select by category'))</h3>
				<form id="categoryform">
					<div class="form-group">
						<label for="category">@(Q::cStr('196:Category'))</label>
						<select class="form-control" id="category" v-model="category">
							<option value="" selected="selected">@(Q::cStr('523:Select category'))</option>
							<option v-for="(label, val) in catlist" :value="val">{{label}}</option>
						</select>
						<small id="categoryHelp" class="form-text text-muted">@(Q::cStr('548:Choose a category and press Select.'))</small>
					</div>
					<button type="button" class="btn btn-primary" v-on:click="formbutton($event)" data-action="categoryform">@(Q::cStr('108:Select'))</button>
					<button type="button" class="btn btn-danger" v-on:click="resetbutton()">@(Q::cStr('122:Reset'))</button>
				</form>
            </div>
        </div>

        <!-- Select by tag  -->
        <div class="side-navi-tab">
            <div class="pad"> 
            	<h3>@(Q::cStr('577:Select by tag'))</h3>
				<div id="htmltagcloud"> 
					<span v-for="(num, tag) in tags" :class="'wrd mr5 tagcloud'+num"><a href="#" :id="tag" class="tagbutton" v-on:click="tagbutton($event)">{{tag}}</a></span> 
				</div>
				<button type="button" class="btn btn-danger mt20" v-on:click="resetbutton()">@(Q::cStr('122:Reset'))</button>
                <small id="categoryHelp" class="form-text text-muted">@(Q::cStr('578:Click on a term from the list'))</small>
            </div>
        </div>

        <!-- Search -->
        <div class="side-navi-tab">
            <div class="pad">
            	<h3>@(Q::cStr('239:Search'))</h3>
				<form class="form-inline mt-2 mt-md-0" id="searchform">
					<input class="form-control mr-sm-2" type="text" placeholder="@(Q::cStr('149:Search'))" aria-label="@(Q::cStr('149:Search'))" v-model="searchtxt">
					<button class="btn btn-primary my-2 my-sm-0 formbutton" v-on:click="formbutton($event)" data-action="searchform" type="button">@(Q::cStr('149:Search'))</button>
					<button type="button" class="ml10 btn btn-danger" v-on:click="resetbutton()">@(Q::cStr('122:Reset'))</button>
					<small id="categoryHelp" class="form-text text-muted">@(Q::uStr('36:Enter a search term and press Search')).</small>
				</form>
            </div>
        </div>

        <!-- Extra -->
        <div class="side-navi-tab">
            <div class="pad">
            	<h3>@(Q::cStr('85:Help'))</h3>
            	<p>@(Q::uStr('36:Click the highlighted tab, a second time ..... ')).</p>
            	<p></p>
            </div>
        </div>

    </div>
</div>
