
var openVpn_slider = '';

//// EVENTS ////

function refreshOpenVpnElements(){
    
    if ($('#noDataOpenVpnPanel').hasClass('hidden')){
        openVpn_slider.reloadSlider();
        
    }
}

function changeOpenVpnDate(data){
    
    var dataParsed = JSON.parse(data);
    
    openVpnDataNoDict = dataParsed.openVpnDataNoDict;
    openvpnData = dataParsed.openvpnData;
    
    $('#noDataOpenVpnPanel').addClass('hidden');
    $('#openVpnDataPanel').removeClass('hidden');
    
    $('#openVpnCtrl1').empty();
    $('#openVpnCtrl1').append('<ul class="bxslider responsiveCellspacing display" id="bxOpenVpn"></ul>')
    
    if($('#openVpnTable_wrapper').length){
        $('#openVpnTable_wrapper').remove();
        $('#openVpnCtrl2').prepend('<table id="openVpnTable" class="responsiveCellspacing display "></table>');
    }else{
        $('#openVpnTable').empty()     
    }
    data1 = drawSlider(openvpnData ,'#bxOpenVpn');
    
    if (data1==0){
        // No data in first panel
        $('#noDataOpenVpnPanel').removeClass('hidden');
        $('#openVpnDataPanel').addClass('hidden');
    }
}

function getFile(d){
    
    v = d.split('_');
    tableId = v[0]+'Table'
    type_download = v[1]

    // Force file download
    $( "#"+tableId).DataTable().button(type_download+':name').trigger(  );

 }

// Document Ready.
$(function() {

    data1 = drawSlider(openvpnData ,'#bxOpenVpn');
    
    if (data1==0){
        // No data in first panel
        $('#noDataOpenVpnPanel').removeClass('hidden');
        $('#openVpnDataPanel').addClass('hidden');
    }
    $('#openVpnCtrl1').css("z-index", 0);
    
});


//// FUNCTIONS ////


function drawTable(data, div, columns){
    
     // Protect dataSet from undefined type
    // if there is no data
    if (typeof data == "undefined"){
        data = [];
        
    }
    data_available = 0;
    if (data.length>0){
        // If there is one array at least, we consider there are
        // data.
        data_available = 1;
    }
    // Every columns have to be shown
    show_columns = []
    for (var i=0;i<columns.length;i++){
        show_columns.push(i)
    }

    if (columns.length>7){
        var arr1= [];
        var arr2 = show_columns;
        fullTableComplete(div, data, columns, 'landscape', arr1, arr2, true, 5);
    }else{
        var arr1= [];
        var arr2 = show_columns;
        fullTableComplete(div, data, columns, '', arr1, arr2, true, 5);
    }
    return data_available;   
}

    
function drawSlider(data, div){
    
    dataSet = data
    
    if (typeof dataSet == "undefined"){
        dataSet = [];
        
    }
    
    drawTable(openVpnDataNoDict, '#openVpnTable', openVpnColumns)
    
    data_available = 0;
    if (dataSet.length>0){
        // If there is one array at least, we consider there are
        // data.
        data_available = 1;
    }
    
    p = ''
    cnt = 0
    i = ''
    
    for (var e=0;e<dataSet.length;e++){

        p = p.concat('<li><div class="row col-xs-12 col-lg-12 col-md-12 col-sm-12">')
            

        for (var i=0;i<dataSet[e].length;i++){
            p = p.concat('<div class="col-lg-6">')

            Object.keys(dataSet[e][i]).forEach( k => {
                p = p.concat('<div class="col-xs-6 title"><p align="right">'+k+'</p></div>');


                x = dataSet[e][i][k]
                
                p = p.concat('<div class="col-xs-6 value"><p align="left">' + x +'</p></div>');
            }) 
            p = p.concat('</div>')
        }
        p = p.concat('</div></li>')

        
    }
    
    

    
    if (dataSet.length==0){
        $(div).append('<font size=4>No data available</font>')
    }else{
        $(div).append(p)

        openVpn_slider = $(div).bxSlider({
            adaptiveHeight: true,
            adaptiveWidth: true,
            mode: 'fade'
        });
    }
   
    return data_available

    
}
