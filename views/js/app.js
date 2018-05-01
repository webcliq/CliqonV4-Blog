/* App.js 
 * Ctrl K4 to fold
 */

/** Cliqon Functions - app() 
 * App.x() - app and utility functions, including:
 *
 *
 ******************************************************************************************************************/

 var App = (function($) {

    // initialise
    // var shared values
    var acfg = {
        useCaching: true,
        idioms: {},
        langcd: jlcd,
        df: new Object,
        dv: new Object,
        dt: new Object, 
        dx: new Object,
        table: 'dbitem',
        tabletype: 'blog',
        search: '',
    spinner: new Spinner(),
    formid: 'dataform',
    emailregex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    emailregex2: /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
    };

    var _set = function(key, value)
    {
        acfg[key] = value;
        return acfg[key];
    };

    var _get = function(key)
    {
        return acfg[key];
    };

    var _config = function()
    {
        return acfg;
    };

    /** Event and display functions
     *
     * actionButton() - responds to clicks on the nav bar
     *
     **************************************************************************************************************************/

        /** Menu Action Buttons
         * @param - object - event
         * @return - object The action
         **/
         var actionButton = function(e, dta)
         {
            var cfg = Cliq.config();

            switch (dta.action) {

                case "loadblog":
                    var urlstr = "/";
                    uLoad(urlstr);
                break;

                case "weblinks":
                    var opts = {
                        'controller' : 'page',
                        'screen': 'content',
                        'action': 'list',
                        'subaction': dta.action
                    };
                    loadPage(opts);
                break;

                case "library":
                    var opts = {
                        'controller' : 'page',
                        'screen': 'content',
                        'action': 'list',
                        'subaction': dta.action
                    };
                    loadPage(opts);
                break;

                case "contactus": 
                    var opts = {
                        'controller' : 'page',
                        'screen': 'content',
                        'action': dta.action,
                        'subaction': ''
                    };
                    loadPage(opts);
                break;

                // data-page
                default: Cliq.success(dta.action); break;
            }
         }

        /** Load news or blog in a news card format
         * Route - URL loads CMSController -> Loads Ajax.Php -> see Blog section -> getblog() -> calls Blog->displayBlog() -> 
         * -> loads Blog template into #maincontent -> runs Callbacks below
         * @param - object - event
         * @return - object The action
         **/
         var loadNews = function(opts)
         {
            if(opts != false) {
                var postdata = opts;
            } else {
                var postdata = {'search': 'notdefined'}
            };
            var urlstr = "/cms/"+jlcd+"/getblog/dbitem/blog/";
            return aja().method('GET').url(urlstr).cache(false).timeout(2500).type('json')
            .data(postdata)
            .on('40x', function(response) {Cliq.error('Page not Found - '+response)})
            .on('500', function(response) {Cliq.error('Server Error - '+response)})
            .on('timeout', function(response) {Cliq.error('Timeout - '+response)})
            .on('success', function(response) {
                if(typeof response == 'object') {
                    // Test NotOK - value already exists
                    var match = /NotOk/.test(response.flag);
                    if(!match == true) {
                        // Template for single article is displayed
                        $('#maincontent').html(response.msg);

                        // Callbacks
                        acfg.dt = new Vue({
                            el: '#blogroll',
                            data: {'rs': response.data},
                            methods: {
                                displayArticle: function(evt, recid, ref, id) {
                                    var row = this.$data.rs[id];
                                    var opts = {
                                        content: `
                                            <div class="col mr10 dbl-pad" id="popuparticle">
                                                <h4 class="bluecc">`+row.d_title[jlcd]+`</h4>
                                                <hr class="style10" />
                                                <img src="`+row.d_image+`" class="img-fluid ml10 maxc18 float-right" />
                                                <span>`+row.d_text[jlcd]+`</span>
                                            </div>
                                        `,
                                        contentSize: {
                                            width: 600,
                                            height: 600
                                        },
                                        paneltype: 'modal',
                                    };
                                    var articlePopup = Cliq.win(opts);
                                }
                            }
                        });

                        acfg.dx = new Vue({
                            el: '#sideNaviData',
                            data: {
                                'category': '',
                                'catlist': response.xtra.catlist,
                                'tags': response.xtra.tagcloud,
                                'searchtxt': ''
                            },
                            methods: {
                                // tagcloud
                                tagbutton: function(evt) {
                                    var word = evt.target.id;
                                    loadNews({'field':'c_options', 'value': word});
                                },
                                // formbutton
                                formbutton: function(evt) {
                                    switch(evt.target.attributes['data-action']['nodeValue']) {
                                        case "categoryform":
                                            loadNews({'field':'c_category', 'value': this.$data.category});
                                        break;

                                        case "searchform":
                                            loadNews({'field':'c_document', 'value': this.$data.searchtxt});
                                        break;
                                    }
                                },
                                // tagcloud
                                resetbutton: function() {
                                    reLoad();
                                }
                            },
                            mounted: function() {

                            }
                        });

                    } else {
                        Cliq.error(response.msg);
                    }; 

                } else { Cliq.error('Response was not JSON object - '+response.msg); }
            }).go(); 
         }

        /** Load page
         * Route - URL loads CMSController -> Loads Ajax.Php -> 

         see Blog section -> getblog() -> calls Blog->displayBlog() -> 
         * -> loads Blog template into #maincontent -> runs Callbacks below

         * @param - object - page or action
         * @return - object The action
         **/
         var loadPage = function(opts)
         {
            var urlstr = "/"+opts.controller+"/"+jlcd+"/"+opts.screen+"/"+opts.action+"/"+opts.subaction+"/";
            uLoad(urlstr) 
         }

    /** Main website CMS Listings using Vue
     * weblinks()
     * - loadTabeleData()
     *
     ********************************************************************************************************/

        /** Library
         *
         * @return - populates and animates a Vue template
         **/
         var loadLibrary = function(opts)
         {
            console.log('Library app loaded');  
            $.each(opts, function(key, val) {
                acfg[key] = val;
            });  

            try {
                acfg.dt = new Vue({
                    el: '#'+acfg.listId,
                    data: {
                        cols: acfg.columns,
                        rows: {},
                        records: {
                            start: acfg.records.start,
                            end: acfg.records.end,
                            total: acfg.records.total
                        }              
                    },
                    methods: {
                        // Search, sort and filter buttons
                        searchbutton: function(event) {
                            acfg.records.offset = 0;
                            var colname = $(event.target).data('id');
                            acfg.search = colname+'|'+$('input[data-name="'+colname+'"]').val();
                            loadListData();
                        },

                        // Clear the search field
                        clearbutton: function(event) {
                            var colname = $(event.target).data('id');
                            $('input[data-name="'+colname+'"]').val('');
                            if(acfg.search != '') {
                                acfg.search = '';
                                loadListData();
                            }
                        },

                        // Row Buttons
                        rowbutton: function(event, row) {
                            var dta = $(event.target).data();
                        }
                    },
                    mounted: function() {
                        loadListData();
                    } // End mounted
                });     
            }
            catch(err) {
                Cliq.error(err.message);
            }    
         }

        /** Weblinks
         *
         * @return - populates and animates a Vue template
         **/
         var loadWeblinks = function(opts)
         {
            console.log('Weblinks app loaded');
            $.each(opts, function(key, val) {
                acfg[key] = val;
            });

            try {
                acfg.dt = new Vue({
                    el: '#'+acfg.listId,
                    data: {
                        cols: acfg.columns,
                        rows: {},
                        records: {
                            start: acfg.records.start,
                            end: acfg.records.end,
                            total: acfg.records.total
                        }              
                    },
                    methods: {
                        // Search, sort and filter buttons
                        searchbutton: function(event) {
                            acfg.records.offset = 0;
                            var colname = $(event.target).data('id');
                            acfg.search = colname+'|'+$('input[data-name="'+colname+'"]').val();
                            loadListData();
                        },

                        // Clear the search field
                        clearbutton: function(event) {
                            var colname = $(event.target).data('id');
                            $('input[data-name="'+colname+'"]').val('');
                            if(acfg.search != '') {
                                acfg.search = '';
                                loadListData();
                            }
                        },

                        // Row Buttons
                        rowbutton: function(event, row) {
                            var dta = $(event.target).data();
                        }
                    },
                    mounted: function() {
                        loadListData();
                    } // End mounted
                });     
            }
            catch(err) {
                Cliq.error(err.message);
            }
         }

        /** Load data for a CMS listing
         *
         * @return - Sets the Data for Vue and starts process of populating pager
         **/
         function loadListData()
         {

            var urlstr = acfg.dataurl;
            aja().method('GET').url(urlstr).cache(false).timeout(10000).type('json')
            .data({
                limit: acfg.records.limit,
                offset: acfg.records.offset,
                search: acfg.search,
                token: jwt
            })
            // .jsonPaddingName('clientRequest')
            // .jsonPadding('cliqon') // ajajsonp_omni
            .on('40x', function(response) { error('Page not Found - '+urlstr+':'+response)})
            .on('500', function(response) { error('Server Error - '+urlstr+':'+response)})
            .on('timeout', function(response){ error('Timeout - '+urlstr+':'+response)})
            .on('200', function(response) {
                if(typeof response == 'object')
                {
                    // Test NotOK - value already exists
                    var match = /NotOk/.test(response.flag);
                    if(!match == true) {

                        acfg.records.offset = response.offset;
                        acfg.records.limit = response.limit;
                        acfg.records.total = response.total;
                        acfg.dt.$data.rows = response.rows;
                        if(response.total > response.limit) {
                           pager(); 
                        }
                        
                    } else { error('Ajax function returned error NotOk - '+urlstr+':'+JSON.stringify(response)); };
                } else { error('Response was not JSON object - '+urlstr+':'+response.msg); };
            }).go();    
         }

        /** Pager
         * page: 1, pageLength: 15, visiblePages: 7, totrecs: 1, offset: 0, limit: 0 
         * acfg.offset = Is the exact number of records into the recordset and is generated from response.offset;
         * acfg.page = Representation of a valid and current page number - say 1 to 7 - it is calculated from Offset using Limit
         * acfg.limit = response.limit - the number of records to display
         * acfg.totrecs = response.totrecs - the total number of records
         **/
         function pager() 
         {               

            acfg.records.totpages = Math.ceil(acfg.records.total / acfg.records.limit);
            acfg.records.currentpage = 

            acfg.pager.recs = acfg.records.limit;
            // Value for start, end and page must always be numeric
            acfg.records.start = parseInt(acfg.records.start);
            acfg.records.end = parseInt(acfg.records.end);
            acfg.records.page = parseInt(acfg.records.page);

            // End number can never be more than total 
            if(acfg.records.end > acfg.records.total || (acfg.records.limit + acfg.records.offset) > acfg.records.total) {
                acfg.records.end = acfg.records.total;
            };

            if(acfg.records.offset > acfg.records.start) {
                acfg.records.start = acfg.records.offset
            };

            if(acfg.records.offset == 0) {
                acfg.records.start = 1;
                acfg.records.end = acfg.records.limit;
            };                  

            acfg.dt.$data.records.start = acfg.records.start;
            acfg.dt.$data.records.end = acfg.records.end;
            acfg.dt.$data.records.total = acfg.records.total;   

            // Pager text - information
            var tpl = `
                <span class="navbar-tex mt0">
                    <!-- records  1  to  0  of  0 -->
                    <span class="ucfirst">`+lstr[143]+`</span>
                    &nbsp;`+acfg.records.start+`
                    &nbsp;`+lstr[140]+`
                    &nbsp;`+acfg.records.end+`
                    &nbsp;`+lstr[142]+`
                    &nbsp;`+acfg.records.total+`                          
                </span>
            `;

            // Page Select         
            tpl += `
                <span class="navbar-text mt0 bluec">`+lstr[155]+`</span>
                <span class="navbar-text mt0">
                    <select class="form-control form-control-sm" style="width: 50px; padding: 5px 1px; display:inline;" name="pageselect" id="pageselect">`;

                    var pagn = explode(',', acfg.pager.select);
                    selectoptions = [];
                    $.each(pagn, function(q,v) {
                        selectoptions[q] = v;
                    });

                    $.each(selectoptions, function(q,n) {
                        tpl += `<option class="" value="`+n+`" `; 
                        if(acfg.records.limit == n) {tpl += `selected `;};
                        tpl += `>`+n+`</option>`;
                    });                        
                    tpl += `</select>    
                </span>
            `;

            // Pagination
            var mn = (acfg.records.page-1);
            var pl = (acfg.records.page+1);

            tpl += `
                <span class="navbar-text mt10">
                  <ul class="pagination" id="pagination">
                    <li class="page-item"><a class="page-link pagerclick" data-page="0" href="#">`+acfg.pager.first+`</a></li>
                    <li class="page-item"><a class="page-link pagerclick" data-page="`+mn+`" href="#">`+acfg.pager.prev+`</a></li>`;

                    for(var y = 1; y <= acfg.records.totpages; y++) {
                       if(y == acfg.records.page) {sel = ' active';} else {var sel = '';};
                       tpl += `<li class="page-item`+sel+`"><a class="page-link pagerclick" data-page="`+y+`" href="#">`+y+`</a></li>`;
                    };

                    tpl += `<li class="page-item"><a class="page-link pagerclick" data-page="`+pl+`" href="#">`+acfg.pager.next+`</a></li>
                    <li class="page-item"><a class="page-link pagerclick" data-page="`+acfg.records.totpages+`" href="#">`+acfg.pager.last+`</a></li>
                  </ul>
                </span>
            `;
            $('#pager').empty().html(tpl); 

            // Events

            $('#pageselect').on('change', function(e) {
                acfg.records.limit = $(this).getValue();
                loadListData();
            });

            $('.pagerclick').on('click', function(event) {
                event.stopImmediatePropagation();
                var dta = $(event.target).data();
                acfg.records.page = dta.page;
                // This handles the click on the cfg.records.page page number
                if(acfg.records.page > 1 || acfg.records.page < acfg.records.totpages) {
                    acfg.records.offset = ((acfg.records.page - 1) * acfg.records.limit);
                };
                loadListData();
            });

            /*
            // From the response we need to work out the pager text values
            if(cfg.records.offset > 1 || cfg.records.offset < cfg.records.total) {
                cfg.records.start = cfg.records.offset;
            } else if((cfg.records.offset + cfg.records.limit) > cfg.records.total) {
                cfg.records.start = ((cfg.records.total - cfg.records.offset) + 1);
            } else if((cfg.records.offset + cfg.records.limit) < cfg.records.total) {
                cfg.records.start = ((cfg.records.total - cfg.records.offset) + 1);
            }     
            */
       
         } // End Pager function

 // explicitly return public methods when this object is instantiated
 return {
    // outside: inside
    set: _set,
    get: _get,    
    config: _config,     
    actionbtn: actionButton,
    loadNews: loadNews,
    weblinks: loadWeblinks,
    library: loadLibrary
 }; 

})(jQuery); 