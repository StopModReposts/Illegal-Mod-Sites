
var smr_illegal = false;
var smr_host = location.host.replace(/\.blogspot\.[a-z]+(\.[a-z]+)?$/, ".blogspot.tld").split(".").join(" ");
var smr_ratings = [0, 0, 0];
var smr_rating_types = [chrome.i18n.getMessage("rating_ads"), chrome.i18n.getMessage("rating_redist"), chrome.i18n.getMessage("rating_misc")];
var smr_rating_stars1 = ["\u2605", "\u2605\u2605", "\u2605\u2605\u2605", "\u2605\u2605\u2605\u2605", "\u2605\u2605\u2605\u2605\u2605"];
var smr_rating_stars2 = ["\u2605\u2605\u2605\u2605", "\u2605\u2605\u2605", "\u2605\u2605", "\u2605", ""];
var smr_rating_level = [chrome.i18n.getMessage("severity_none"), chrome.i18n.getMessage("severity_low"), chrome.i18n.getMessage("severity_medium"), chrome.i18n.getMessage("severity_high"), chrome.i18n.getMessage("severity_veryhigh")];
var smr_rating_color = ["green", "yellow", "orange", "orangered", "red"];
var smr_this_rating = "";

for (var smr_bad_host in smr_hosts) {
    if (smr_hosts.hasOwnProperty(smr_bad_host)) {
        if ((smr_host.length > smr_bad_host.length && smr_host.substr(smr_host.length - smr_bad_host.length - 1) == " " + smr_bad_host) || (smr_host.length == smr_bad_host.length && smr_host == smr_bad_host)) {
            smr_illegal = true;
            smr_this_rating = smr_hosts[smr_bad_host];
            for (var i = 0; i < 3; i++) {
                smr_ratings[i] = parseInt(smr_this_rating.substring(i, i + 1)) - 1;
            }
        }
    }
}

if (smr_overlay_element == null && smr_illegal) { // Ensure that the overlay doesn't already exist
    var smr_tidoverlay = Math.floor(Math.random() * 1000000);
    
    // Create base elements
    var smr_base_br = document.createElement("br");
    
    var smr_base_p = document.createElement("p");
    smr_base_p.setAttribute("style", "font-size: 16px; color: white; text-align: center; font-family: arial, helvetica, sans-serif !important; line-height: 115%;");
    
    var smr_base_td = document.createElement("td");
    smr_base_td.setAttribute("style", "border: none; background: none; width: 45%; font-family: arial, helvetica, sans-serif !important; color: white; font-size: 19px; height: 27px;");
    
    var smr_base_cell = document.createElement("div");
    smr_base_cell.setAttribute("style", "padding: 5px 0px; background-color: green; text-align: center; color: white; font-size: 20px; font-family: arial, helvetica, sans-serif !important; min-height: 47px;");
    
    var smr_base_b = document.createElement("b");
    
    var smr_base_span = document.createElement("span");
    smr_base_span.setAttribute("style", "color: white; font-family: arial, helvetica, sans-serif !important;");
    
    var smr_base_small = smr_base_span.cloneNode(false);
    smr_base_small.style.fontSize = "12px";
    
    var smr_base_btn = document.createElement("a");
    smr_base_btn.style.textDecoration = "none";
    
    var smr_base_ftlink = smr_base_btn.cloneNode(false);
    smr_base_ftlink.setAttribute("style", "text-decoration: underline; font-size: 19px; color: skyblue; font-family: arial, helvetica, sans-serif !important;");
    
    var smr_base_ftdash = smr_base_small.cloneNode(false);
    smr_base_ftdash.style.fontSize = "19px";
    smr_base_ftdash.textContent = " - ";
    
    var smr_base_table = document.createElement("table");
    smr_base_table.setAttribute("style", "width: 100%; border: none; background: none;");
    
    var smr_base_tbody = document.createElement("tbody");
    smr_base_tbody.setAttribute("style", "border: none; background: none;");
    
    var smr_base_tr = document.createElement("tr");
    smr_base_tr.setAttribute("style", "border: none; background: none;");
    
    var smr_base_td_r = smr_base_td.cloneNode(false);
    smr_base_td_r.style.width = "33%";
    smr_base_td_r.style.textAlign = "center";
    
    var smr_base_th_r = document.createElement("th");
    smr_base_th_r.setAttribute("style", "border: none; background: none; width: 33%; font-family: arial, helvetica, sans-serif !important; color: gray; font-size: 19px; height: 27px; text-align: center;");
    
    var smr_base_a = document.createElement("a");
    smr_base_a.setAttribute("style", "color: lightgray; font-family: arial, helvetica, sans-serif !important;");
    
    
    // Draw the overlay - indentation follows HTML hierarchy
    var smr_overlay_element = document.createElement("div");
    smr_overlay_element.setAttribute("style", "width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 2147483647; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlPA24Ia1gAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=); display: block; text-align: center;");
    smr_overlay_element.id = "smr_warning_overlay_" + smr_tidoverlay;
    document.getElementsByTagName("body")[0].appendChild(smr_overlay_element);
    
        var smr_center_element = document.createElement("center");
        smr_center_element.style.height = "100%";
        smr_center_element.id = "smr_center_element_" + smr_tidoverlay;
        document.getElementById("smr_warning_overlay_" + smr_tidoverlay).appendChild(smr_center_element);
        
            var smr_div_element = document.createElement("div");
            smr_div_element.setAttribute("style", "position: relative; top: 50%; transform: translateY(-50%); border: none; max-width: 800px; width: 100%;");
            smr_div_element.id = "smr_div_element_" + smr_tidoverlay;
            document.getElementById("smr_center_element_" + smr_tidoverlay).appendChild(smr_div_element);
            
                var smr_title = smr_base_p.cloneNode(false);
                smr_title.style.fontSize = "32px";
                smr_title.style.color = "red";
                smr_title.style.textShadow = "0 0 3px #000";
                smr_title.style.marginBottom = "32px";
                smr_title.style.marginTop = "0px";
                smr_title.textContent = chrome.i18n.getMessage("blacklist_warn");
                document.getElementById("smr_div_element_" + smr_tidoverlay).appendChild(smr_title);
                
                var smr_explain = smr_base_p.cloneNode(false);
                smr_explain.id = "smr_explain_" + smr_tidoverlay;
                smr_explain.textContent = chrome.i18n.getMessage("what_happened") + " ";
                document.getElementById("smr_div_element_" + smr_tidoverlay).appendChild(smr_explain);
                    
                    var smr_explain_learnmore = smr_base_a.cloneNode(false);
                    smr_explain_learnmore.href = "http://stopmodreposts.org/";
                    smr_explain_learnmore.textContent = chrome.i18n.getMessage("campaign_info");
                    document.getElementById("smr_explain_" + smr_tidoverlay).appendChild(smr_explain_learnmore);
                    
                    var smr_explain_br2 = smr_base_br.cloneNode(false);
                    document.getElementById("smr_explain_" + smr_tidoverlay).appendChild(smr_explain_br2);
                    
                    var smr_explain_br3 = smr_base_br.cloneNode(false);
                    document.getElementById("smr_explain_" + smr_tidoverlay).appendChild(smr_explain_br3);
                    
                var smr_rating_title = smr_base_p.cloneNode(false);
                smr_rating_title.style.fontSize = "22px";
                smr_rating_title.style.color = "gray";
                smr_rating_title.style.textShadow = "0 0 3px #000";
                smr_rating_title.style.marginBottom = "17px";
                smr_rating_title.style.marginTop = "0px";
                smr_rating_title.textContent = chrome.i18n.getMessage("this_site", location.host);
                document.getElementById("smr_div_element_" + smr_tidoverlay).appendChild(smr_rating_title);
                
                var smr_rating_info_show = smr_base_p.cloneNode(false);
                smr_rating_info_show.id = "smr_rating_info_show_" + smr_tidoverlay;
                document.getElementById("smr_div_element_" + smr_tidoverlay).appendChild(smr_rating_info_show);
                
                    var smr_rating_show_link = smr_base_a.cloneNode(false);
                    smr_rating_show_link.href = "javascript:void();";
                    smr_rating_show_link.textContent = chrome.i18n.getMessage("learn_more");
                    smr_rating_show_link.addEventListener("click", function() {
                        smr_rating_info.style.display = "block";
                        smr_rating_info_show.style.display = "none";
                    });
                    document.getElementById("smr_rating_info_show_" + smr_tidoverlay).appendChild(smr_rating_show_link);
                
                var smr_rating_info = smr_base_p.cloneNode(false);
                smr_rating_info.style.display = "none";
                smr_rating_info.id = "smr_rating_info_" + smr_tidoverlay;
                smr_rating_info.textContent = chrome.i18n.getMessage("how_we_rate") + " ";
                document.getElementById("smr_div_element_" + smr_tidoverlay).appendChild(smr_rating_info);
                
                    var smr_rating_hide_link = smr_base_a.cloneNode(false);
                    smr_rating_hide_link.href = "javascript:void();";
                    smr_rating_hide_link.textContent = chrome.i18n.getMessage("hide_rating_guide");
                    smr_rating_hide_link.addEventListener("click", function() {
                        smr_rating_info.style.display = "none";
                        smr_rating_info_show.style.display = "block";
                    });
                    document.getElementById("smr_rating_info_" + smr_tidoverlay).appendChild(smr_rating_hide_link);
                
                var smr_rating_table = smr_base_table.cloneNode(false);
                smr_rating_table.id = "smr_rating_table_" + smr_tidoverlay;
                smr_rating_table.style.margin = "30px 0px";
                document.getElementById("smr_div_element_" + smr_tidoverlay).appendChild(smr_rating_table);
                
                    var smr_rating_tbody = smr_base_tbody.cloneNode(false);
                    smr_rating_tbody.id = "smr_rating_tbody_" + smr_tidoverlay;
                    document.getElementById("smr_rating_table_" + smr_tidoverlay).appendChild(smr_rating_tbody);
                    
                        var smr_rating_row1 = smr_base_tr.cloneNode(true);
                        smr_rating_row1.id = "smr_rating_row1_" + smr_tidoverlay;
                        document.getElementById("smr_rating_tbody_" + smr_tidoverlay).appendChild(smr_rating_row1);
                        
                            var smr_rating_r1c1 = smr_base_th_r.cloneNode(false);
                            smr_rating_r1c1.textContent = chrome.i18n.getMessage("category");
                            document.getElementById("smr_rating_row1_" + smr_tidoverlay).appendChild(smr_rating_r1c1);
                            
                            var smr_rating_r1c2 = smr_base_th_r.cloneNode(false);
                            smr_rating_r1c2.textContent = chrome.i18n.getMessage("evilness");
                            document.getElementById("smr_rating_row1_" + smr_tidoverlay).appendChild(smr_rating_r1c2);
                            
                            var smr_rating_r1c3 = smr_base_th_r.cloneNode(false);
                            smr_rating_r1c3.textContent = chrome.i18n.getMessage("ratelevel");
                            document.getElementById("smr_rating_row1_" + smr_tidoverlay).appendChild(smr_rating_r1c3);
                        
    for (var i = 0; i < smr_rating_types.length; i++) {
    
                        var smr_rating_rown = smr_base_tr.cloneNode(true);
                        smr_rating_rown.id = "smr_rating_rown" + i + "_" + smr_tidoverlay
                        document.getElementById("smr_rating_tbody_" + smr_tidoverlay).appendChild(smr_rating_rown);
                        
                            var smr_rating_rnc1 = smr_base_td_r.cloneNode(false);
                            smr_rating_rnc1.textContent = smr_rating_types[i];
                            document.getElementById("smr_rating_rown" + i + "_" + smr_tidoverlay).appendChild(smr_rating_rnc1);
                            
                            var smr_rating_rnc2 = smr_base_td_r.cloneNode(false);
                            smr_rating_rnc2.id = "smr_rating_rnsc" + i + "_" + smr_tidoverlay;
                            document.getElementById("smr_rating_rown" + i + "_" + smr_tidoverlay).appendChild(smr_rating_rnc2);
                            
                                var smr_rating_rnc2_a = smr_base_span.cloneNode(false);
                                smr_rating_rnc2_a.style.color = "red";
                                smr_rating_rnc2_a.style.fontWeight = "100";
                                smr_rating_rnc2_a.textContent = smr_rating_stars1[smr_ratings[i]];
                                document.getElementById("smr_rating_rnsc" + i + "_" + smr_tidoverlay).appendChild(smr_rating_rnc2_a);
                                
                                var smr_rating_rnc2_b = smr_base_span.cloneNode(false);
                                smr_rating_rnc2_b.style.color = "lightgray";
                                smr_rating_rnc2_b.style.fontWeight = "100";
                                smr_rating_rnc2_b.textContent = smr_rating_stars2[smr_ratings[i]];
                                document.getElementById("smr_rating_rnsc" + i + "_" + smr_tidoverlay).appendChild(smr_rating_rnc2_b);
                            
                            var smr_rating_rnc3 = smr_base_td_r.cloneNode(false);
                            smr_rating_rnc3.textContent = smr_rating_level[smr_ratings[i]];
                            smr_rating_rnc3.style.color = smr_rating_color[smr_ratings[i]];
                            document.getElementById("smr_rating_rown" + i + "_" + smr_tidoverlay).appendChild(smr_rating_rnc3);
    }
    if (smr_this_rating.length > 3) {
    
                var smr_rating_notes = smr_base_p.cloneNode(false);
                smr_rating_notes.style.marginBottom = "30px";
                smr_rating_notes.textContent = chrome.i18n.getMessage("site_notes", smr_this_rating.substring(3));
                document.getElementById("smr_div_element_" + smr_tidoverlay).appendChild(smr_rating_notes);
    }
                var smr_btn_table = smr_base_table.cloneNode(false);
                smr_btn_table.id = "smr_btn_table_" + smr_tidoverlay;
                document.getElementById("smr_div_element_" + smr_tidoverlay).appendChild(smr_btn_table);
                
                    var smr_btn_tbody = smr_base_tbody.cloneNode(false);
                    smr_btn_tbody.id = "smr_btn_tbody_" + smr_tidoverlay;
                    document.getElementById("smr_btn_table_" + smr_tidoverlay).appendChild(smr_btn_tbody);
                    
                        var smr_btn_row = smr_base_tr.cloneNode(true);
                        smr_btn_row.id = "smr_btn_row_" + smr_tidoverlay;
                        document.getElementById("smr_btn_tbody_" + smr_tidoverlay).appendChild(smr_btn_row);
                        
                            var smr_btn_close_cell = smr_base_td.cloneNode(false);
                            smr_btn_close_cell.id = "smr_warning_close_" + smr_tidoverlay;
                            document.getElementById("smr_btn_row_" + smr_tidoverlay).appendChild(smr_btn_close_cell);
                            
                                var smr_overlay_close = smr_base_btn.cloneNode(false);
                                smr_overlay_close.href = "javascript:void();";
                                smr_overlay_close.addEventListener("click", function(event) {window.history.back();});
                                smr_overlay_close.id = "smr_overlay_close_" + smr_tidoverlay;
                                document.getElementById("smr_warning_close_" + smr_tidoverlay).appendChild(smr_overlay_close);
                                
                                    var smr_close_div = smr_base_cell.cloneNode(false);
                                    smr_close_div.id = "smr_close_div_" + smr_tidoverlay;
                                    document.getElementById("smr_overlay_close_" + smr_tidoverlay).appendChild(smr_close_div);
                                    
                                        var smr_close_div_b = smr_base_b.cloneNode(false);
                                        smr_close_div_b.textContent = chrome.i18n.getMessage("go_back");
                                        document.getElementById("smr_close_div_" + smr_tidoverlay).appendChild(smr_close_div_b);
                                        
                                        var smr_close_div_br = smr_base_br.cloneNode(false);
                                        document.getElementById("smr_close_div_" + smr_tidoverlay).appendChild(smr_close_div_br);
                                        
                                        var smr_close_div_span = smr_base_small.cloneNode(false);
                                        smr_close_div_span.textContent = chrome.i18n.getMessage("why_go_back");
                                        document.getElementById("smr_close_div_" + smr_tidoverlay).appendChild(smr_close_div_span);
                            
                            var smr_btn_space = smr_base_td.cloneNode(false);
                            smr_btn_space.style.width = "10%";
                            document.getElementById("smr_btn_row_" + smr_tidoverlay).appendChild(smr_btn_space);
                            
                            var smr_btn_continue_cell = smr_base_td.cloneNode(false);
                            smr_btn_continue_cell.id = "smr_warning_continue_" + smr_tidoverlay;
                            document.getElementById("smr_btn_row_" + smr_tidoverlay).appendChild(smr_btn_continue_cell);
                            
                                var smr_overlay_continue = smr_base_btn.cloneNode(false);
                                smr_overlay_continue.href = "javascript:void();";
                                smr_overlay_continue.addEventListener("click", function(event) {document.getElementById('smr_warning_overlay_' + smr_tidoverlay).style.display = 'none';});
                                smr_overlay_continue.id = "smr_overlay_continue_" + smr_tidoverlay;
                                document.getElementById("smr_warning_continue_" + smr_tidoverlay).appendChild(smr_overlay_continue);
                                
                                    var smr_continue_div = smr_base_cell.cloneNode(false);
                                    smr_continue_div.style.backgroundColor = "red";
                                    smr_continue_div.id = "smr_continue_div_" + smr_tidoverlay;
                                    document.getElementById("smr_overlay_continue_" + smr_tidoverlay).appendChild(smr_continue_div);
                                    
                                        var smr_continue_div_b = smr_base_b.cloneNode(false);
                                        smr_continue_div_b.textContent = chrome.i18n.getMessage("continue");
                                        document.getElementById("smr_continue_div_" + smr_tidoverlay).appendChild(smr_continue_div_b);
                                        
                                        var smr_continue_div_br = smr_base_br.cloneNode(false);
                                        document.getElementById("smr_continue_div_" + smr_tidoverlay).appendChild(smr_continue_div_br);
                                        
                                        var smr_continue_div_span = smr_base_small.cloneNode(false);
                                        smr_continue_div_span.textContent = chrome.i18n.getMessage("why_continue");
                                        document.getElementById("smr_continue_div_" + smr_tidoverlay).appendChild(smr_continue_div_span);
                
                var smr_at_br = smr_base_br.cloneNode(false);
                document.getElementById("smr_div_element_" + smr_tidoverlay).appendChild(smr_at_br);
                
                var smr_footer_links = smr_base_p.cloneNode(false);
                smr_footer_links.id = "smr_footer_links_" + smr_tidoverlay;
                document.getElementById("smr_div_element_" + smr_tidoverlay).appendChild(smr_footer_links);
                
                    var smr_link_hashtag = smr_base_ftlink.cloneNode(false);
                    smr_link_hashtag.href = "https://twitter.com/hashtag/StopModReposts";
                    smr_link_hashtag.target = "_blank";
                    smr_link_hashtag.textContent = "#StopModReposts";
                    document.getElementById("smr_footer_links_" + smr_tidoverlay).appendChild(smr_link_hashtag);
                
                    var smr_footer_dash_1 = smr_base_ftdash.cloneNode(true);
                    document.getElementById("smr_footer_links_" + smr_tidoverlay).appendChild(smr_footer_dash_1);
                    
                    var smr_link_twitter = smr_base_ftlink.cloneNode(false);
                    smr_link_twitter.href = "https://twitter.com/StopModReposts";
                    smr_link_twitter.target = "_blank";
                    smr_link_twitter.textContent = "@StopModReposts";
                    document.getElementById("smr_footer_links_" + smr_tidoverlay).appendChild(smr_link_twitter);
                
                    var smr_footer_dash_2 = smr_base_ftdash.cloneNode(true);
                    document.getElementById("smr_footer_links_" + smr_tidoverlay).appendChild(smr_footer_dash_2);
                    
                    var smr_link_website = smr_base_ftlink.cloneNode(false);
                    smr_link_website.href = "http://stopmodreposts.org/";
                    smr_link_website.target = "_blank";
                    smr_link_website.textContent = "StopModReposts.org";
                    document.getElementById("smr_footer_links_" + smr_tidoverlay).appendChild(smr_link_website);
    
}