
/////EVENTS/////


// Function to download information in 
// PDF or CSV format.
function getFileZones(d){
    
    v = d.split('_');
    tableId = v[0]+'Table'
    type_download = v[1]
    window.alert(tableId)
    // Force file download
    $( "#"+tableId).DataTable().button(type_download+':name').trigger(  );

 }

 
 // User wants to change the date, so ajax query is completed and
 // network.js call this function to refresh zones data.
function changeZonesDate(data){
    
    var dataZonesParsed = JSON.parse(data);
    zone_data = dataZonesParsed.zones;
    
    clearZonesData();
    
    if (vdoms.length>0){
        drawZonesSlider('#bxZones', zone_data, -1);
    }else{
        drawZonesSlider('#bxZones', zone_data, -2);;
    }
}


// Common function to delete all data.
function clearZonesData(){

    $('#zonesCtrl1').empty()
    $('#zonesCtrl1').append('<ul class="bxslider" id="bxZones"></ul>');
}


// Vdom is selected so data have to be refreshed.
function updateZonesVdomSelector(event){
    
    clearZonesData();

    if (vdoms.length>0){
        drawZonesSlider('#bxZones', zone_data, getVdomIndexFromTag());
    }else{
        drawZonesSlider('#bxZones', zone_data, getVdomIndexFromTag());;
    }
}


function getVdomIndexFromTag(){
    
    // return vdom Index from global vdom tag
    var out = -1;
    vdom = vdomTagSelected.substring(1,vdomTagSelected.lastIndexOf("B"));
    for (var e = 0; e<vdoms.length; e++){
        if (vdoms[e].localeCompare(vdom)==0){
            out = e;
            e = vdoms.length+1;
        }
    }
    return out   
}


/*
 *  DOCUMENT READY
 */
$(function() {
    if (vdoms.length>0){
        drawZonesSlider('#bxZones', zone_data, -1);
    }else{
        drawZonesSlider('#bxZones', zone_data, -2);;
    }
    
    drawZonesTable('#zonesTable', zone_data, zones_columns)
});


/*
 *  EVENTS REGISTRATION 
 */
function drawZonesTable(div, data, columns){
    
    
    if (index == -1){
        index = 0;
    }
    
    if (vdoms.length >0){
        dataSet = data[getVdomIndexFromTag()];
    } else{
        dataSet = data;  
    }
    
    if (typeof dataSet == "undefined"){
        dataSet = [];
    }
    out = []
    for (var e=0;e<dataSet.length;e++){
        v = []
        for (var index=0;index<vec_columns.length;index++){
            append = 0
            for (var d=0;d<dataSet[e].length;d++){
                Object.keys(dataSet[e][d]).forEach( k => {
                    if (k.localeCompare(vec_columns[index])==0){
                        v.push(dataSet[e][d][k])
                        append = 1
                    }
                })   
            }
            if (append==0){
                v.push('-')
            }
        }
        out.push(v)
        v = []
    }
    if (columns.length>7){
        var arr1= [];
        var arr2 = [0,1,2,3,4,5,6,7];
        fullTableComplete(div, out, columns, 'landscape', arr1, arr2, true, 5);
    }else{
        var arr1= [];
        var arr2 = [0,1,2,3,4,5,6,7];
        fullTableComplete(div, out, columns, '', arr1, arr2, true, 5);
    }
    
}

function drawZonesSlider (div, data, index){
    
    if (index == -1){
        index = 0;
    }
    
    if (vdoms.length >0){
        // Fw is virtualized
        dataSet = data[index];
    } else{
        dataSet = data;  
    }
    
    if (typeof dataSet == "undefined"){
        dataSet = [];
    }
    
    if (typeof dataSet !== "undefined"){
        
        var p = '<li>';
        var cnt = 0;
        for (var e=0;e<dataSet.length;e++){

            if (cnt==2){
                p = p.concat('</li><li>');
                cnt = 0;
            }
            p = p.concat('<div class=\"col-lg-6\">');
            cnt = cnt+1;
            for (var d=0;d<dataSet[e].length;d++){
                p = p.concat('<div class=\"row\">');
                Object.keys(dataSet[e][d]).forEach( k => {
                    p = p.concat('<div class=\"title col-xs-6\">');
                    p = p.concat('<p align=\"left\">'+k+' : </p></div>');
                    p = p.concat('<div class=\"value col-xs-6\">');
                    if (k.localeCompare('interfaces')==0){
                        for (var x=0;x<dataSet[e][d][k].length;x++){
                            p = p.concat('<p align=\"left\">'+dataSet[e][d][k][x]+'</p>');
                        }
                        
                    }
                    else{
                        p = p.concat('<p align=\"left\">'+dataSet[e][d][k]+'</p>');
                    }
                    p = p.concat('</div></div>');
                })   
                
            }
            p = p.concat('</div>');
        }
        if (cnt == 1 || cnt == 2){
            p = p.concat('</li>');
        }
        
        if (dataSet.length ==0){
            p = '<font size=4 style="margin: 0 0 0 41%;">No data available</font>';
        }
        $(div).append(p)
        
        if(dataSet.length !=0){
            $('#bxZones').bxSlider({
                adaptiveHeight: true,
                mode: 'fade'
            });
        }
    }
    $('.bx-controls-direction > a').css("zIndex", 0);
}