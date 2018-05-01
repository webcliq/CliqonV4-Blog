<script>
var sitepath = "@raw($protocol)"+document.location.hostname+"/"; 
var jspath = sitepath+"includes/js/";
var viewpath = sitepath+"views/"; 
var jlcd = '@($idiom)', lstr = [], str = [];
var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
var jwt = "@raw($jwt)"; // This is now essential

// basket.clear(true);
basket
.remove('app', 'cliq')
.require(  
    {url: jspath+"library.js"},
    {url: viewpath+"js/fontawesome.js"},
    {url: viewpath+"js/library.js"},
    {url: viewpath+"js/jspanel.min.js"},
    {url: jspath+"phpjs.js"}, 
    {url: viewpath+"js/cliqon.js", key: "cliq", skipCache: true},     
    {url: jspath+"i18n/cliqon."+jlcd+".js"},   
    {url: viewpath+"js/app.js", key: "app", skipCache: true}
).then(function(msg) {

    // Javascript language file load
    lstr = str[jlcd];
    // Dropzone.autoDiscover = false;
    var sessid = Cookies.get('PHPSESSID');

    // $('.contenteditable').jinplace({submitFunction: function(opts, value) {return postContent(opts, value)}});

    // Quark
    // for(t=document.querySelectorAll`*`,i=t.length;i--;)for(s=t[i].classList,c=s.length;c--;)z=s[c].split`-`,u=z[1],t[i].style[z[0]]=~~u?u+'px':u; 

    $("select[name='languageselector']").on('change', function(e) {
        var lcdcode = $(this).getValue(); 
        window.open('/page/'+lcdcode+'/@($page)','_self');   
    });

    $(".menubutton").on('click', function(e) { 
        e.preventDefault();  
        var dta = $(this).data(); 
        App.actionbtn(e, dta);
    }); 

    @raw($scripts)

}, function (error) {
    // There was an error fetching the script
    console.log(error);
}); 

var postContent = function(dta, value) {

    aja().method('POST').url(dta.url).cache(false).timeout(2500).type('json').data({
        'value': value,
        'reference': dta.object
    })
    .on('40x', function(response) {Cliq.error('Page not Found - '+urlstr+':'+response);})
    .on('500', function(response) {Cliq.error('Server Error - '+urlstr+':'+response);})
    .on('timeout', function(response) {Cliq.error('Timeout - '+urlstr+':'+response);})
    .on('success', function(response) {
        if(typeof response == 'object') {
            // Test NotOK - value already exists
            var match = /NotOk/.test(response.flag);
            if(!match == true) {  
                Cliq.success(response.msg); 
                $('#id_'+dta.object).html(response.data);
            } else { Cliq.error('Ajax function returned error NotOk - '+JSON.stringify(response)); };
        } else { Cliq.error('Response was not JSON object - '+urlstr+':'+response.msg); };
    }).go(); 

    return value;
} 
</script>