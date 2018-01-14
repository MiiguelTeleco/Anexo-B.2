/*
 *  GLOBAL VARIABLES 
 */

var sensorIpsTagSelected = '';

/*
 *  EVENTS REGISTRATION 
 */



function refreshIpsEntryTable(event) {
    
    $('#ipsEntryPanel').removeClass('hidden')
        
    if ($('#noDataDlpPanel').hasClass('hidden')){
        $('#dlpSensorTable').DataTable().responsive.recalc();
        $('#dlpSensorEntryTable').DataTable().responsive.recalc();
    }
    
    // Create new entry table when a 
    // new profile is clicked

    // Look for the vdom index and the entry index
    // to get all data
    if (vdoms.length >0){
        for (var cnt = 0; cnt < vdoms.length; cnt++){
            if (vdomTagSelected.search(vdoms[cnt])!=-1){
                indexVdom = cnt;
            }
        }
        new_table = vdomIpsSensorData[indexVdom];
    } else{
        indexVdom = -1;
        new_table = vdomIpsSensorData;
    }

    
    for (var profIndex = 0; profIndex < new_table.length; profIndex++){
        if (new_table[profIndex][1].replace(/ /g,"-").localeCompare(event)==0){
            index = new_table.indexOf(new_table[profIndex]);
            profIndex = new_table.length; // Going out the loop
        }
    }

    
    // Refresh table
    if (sensorIpsTagSelected.length>0){
        $(sensorIpsTagSelected).removeClass('active');
    }
    sensorIpsTagSelected = '#ips-button-';
    sensorIpsTagSelected = sensorIpsTagSelected.concat(event);
    $(sensorIpsTagSelected).addClass('active');


    $('#ipsCtrl2').empty();
    $('#ipsCtrl2').append('<table id="ipsSensorEntryTable" class="responsiveCellspacing display"></table>')
    drawIpsSensorEntryTable('#ipsSensorEntryTable', index, indexVdom);
    
  
    
    // Scroll to the certain aggr panel just in case it's not on top.
    scrollToSection('#ipsSensorEntryTable', 112);

    

}
// Refresh data when new vdom is selected.

function updateIpsVdomSelector(event){
    
    // Refresh all dashboard when a vdom is clicked
     
    deleteIpsData();
    
    // Get index of new vdom
    var index = vdoms.indexOf(event);
    
    // Create new tables
    data1 = drawIpsSensorTable('#ipsSensorTable', index);
    
    data2 = drawIpsSensorEntryTable('#ipsSensorEntryTable', -1, index); 
    

    if (data1 == 0){
        $('#ipsPanel').addClass('hidden');
        $('#noDataIpsPanel').removeClass('hidden');
    }
    
}


// Document Ready.
$(function() {
    
    var data1 = 0;
    var data2 = 0;
    
    if (vdoms.length >0){
        index = 0;
    }else{
        index = -1;
    }
    
    if (vdomIpsSensorData.length>0){
        setIpsButtons(index);
    }
    
    if (vdoms.length >0){
        data1 = drawIpsSensorTable('#ipsSensorTable', -1);
    }else{
        data1 = drawIpsSensorTable('#ipsSensorTable', -2);
    }
    //drawIpsSensorEntryTable('#ipsSensorEntryTable', -1, -1);
    
    if (data1 == 0 ){
        // There is no data in av section
        $('#ipsPanel').addClass('hidden');
        $('#noDataIpsPanel').removeClass('hidden');
    }
});


// Common function to delete all data from html template.
function deleteIpsData(){
    
    $('#ipsEntryPanel').addClass('hidden');
    
    var sensorIpsTagSelected = '';
    
    $('#ipsPanel').removeClass('hidden');
    $('#noDataIpsPanel').addClass('hidden');
    
        
    if($('#ipsSensorTable_wrapper').length){
        // wrapper has to be removed because a new table
        // will be created after this restart
        $('#ipsSensorTable_wrapper').remove();
        $('#ipsCtrl1').append('<table id="ipsSensorTable" class="responsiveCellspacing display"></table>');
    }else{
        $('#ipsSensorTable').empty()     
    }
    
    if($('#ipsSensorEntryTable_wrapper').length){
        // wrapper has to be removed because a new table
        // will be created after this restart
        $('#ipsSensorEntryTable_wrapper').remove();
        $('#ipsCtrl2').append('<table id="ipsSensorEntryTable" class="responsiveCellspacing display"></table>');
    }else{
        $('#ipsSensorEntryTable').empty()     
    }
}


// called to draw information after a new date query
function executeIpsDocument(data){
    
    // This function is executed by ids.js when
    // new date is clicked. 
    // Every data has to be removed and drew again.
    
    // Remove all
    
    var dataParsed = JSON.parse(data);
    vdomIpsSensorData = dataParsed.vdomIpsProfData;
    vdomIpsEntryData = dataParsed.vdomIpsEntryData;
    vdoms = dataParsed.vdoms;
    
    // Initialize all data
    deleteIpsData();

    
    // Draw again all data
    var data1 = 0;
    var data2 = 0;
    
    if (vdoms.length >0){
        index = 0;
    }else{
        index = -1;
    }
    
    if (vdomIpsSensorData.length>0){
        setIpsButtons(index);
    }
    
    if (vdoms.length >0){
        data1 = drawIpsSensorTable('#ipsSensorTable', -1);
    }else{
        data1 = drawIpsSensorTable('#ipsSensorTable', -2);
    }
    drawIpsSensorEntryTable('#ipsSensorEntryTable', -1, -1);
    
    if (data1 == 0 && data2 == 0){
        // There is no data in av section
        $('#ipsPanel').addClass('hidden');
        $('#noDataIpsPanel').removeClass('hidden');
    }
    
}
/*
 *  FUNCTIONS
 */

function drawIpsSensorTable(div, index) {
    
    // Draw ips sensor table
    
    // Represents first vdom by default
    if (index == -1){
        index = 0;
    }
    if (vdoms.length >0){
        // Fw is virtualized
        dataSet = vdomIpsSensorData[index];
    } else{
        dataSet = vdomIpsSensorData;
    }
    // Protect dataSet from undefined type
    // if there is no data
    if (typeof dataSet == "undefined"){
        dataSet = [];
    }
    data_available = 0;
    for (var e = 0; e<dataSet.length; e++){
        if (dataSet[e].length>0){
            data_available = 1;
        }
    }
    
    if (sensorIpsDetailedColumns.length>7){
        var arr1= [1];
        var arr2 = [1,2,3,4];
        fullTableComplete(div, dataSet, sensorIpsDetailedColumns, 'landscape', arr1, arr2, true, 5);
    }else{
        var arr1= [1];
        var arr2 = [1,2,3,4];
        fullTableComplete(div, dataSet, sensorIpsDetailedColumns, '', arr1, arr2, true, 5);
    }

    //$(sensorIpsTagSelected).addClass('active');
    return data_available


}

function drawIpsSensorEntryTable(div, index, vdomIndex) {
    
    // Represents entries from first profile from 
    // first vdom
    if (index == -1){
        index = 0;
    }
    if (vdomIndex == -1){
        vdomIndex = 0;
    }
    
    if (vdoms.length >0){
        // Fw is virtualized
        dataSet = vdomIpsEntryData[vdomIndex][index];
    } else{
        dataSet = vdomIpsEntryData[index];
    }
    // Protect dataSet from undefined type
    // if there is no data
    if (typeof dataSet == "undefined"){
        dataSet = [];
    }
    data_available = 0;
    for (var e = 0; e<dataSet.length; e++){
        if (dataSet[e].length>0){
            data_available = 1;
        }
    }

    if (ipsEntryDetailedColumns.length>7){
        var arr1= [];
        var arr2 = [0,1,2,3,4,5,6,7,8];
        fullTableComplete(div, dataSet, ipsEntryDetailedColumns, 'landscape', arr1, arr2, true, 5);
    }else{
        var arr1= [];
        var arr2 = [0,1,2,3,4,5,6,7,8];
        fullTableComplete(div, dataSet, ipsEntryDetailedColumns, '', arr1, arr2, true, 5);
    }

    
    return data_available

}


/*
 *  ACTIONS
 */


function setIpsButtons(vdom) {

    // Creates de profile buttons in profile table

    if (vdom==0){
        for (var v=0;v<vdomIpsSensorData.length;v++){
            if (vdomIpsSensorData[v].length>0){
                data = vdomIpsSensorData[v];
                for (var e=0;e<data.length;e++){
                    name = data[e][0].replace(/ /g,"-");
                    btn = '<button class="btn btn-default btn-xs" id = "';
                    btn = btn.concat('ips-button-'+name+'"');
                    btn = btn.concat(' onclick="refreshIpsEntryTable(\'' + name + '\')">');
                    
                    btn = btn.concat(name+'</button>');
                    data[e][0] = btn;
                    data[e].splice(1, 0, name);
                }
            }
        }
    }else{
        if (vdomIpsSensorData.length>0){
            data = vdomIpsSensorData;
            for (var e=0;e<data.length;e++){
                name = data[e][0].replace(/ /g,"-");
                btn = '<button class="btn btn-default btn-xs" id = "';
                btn = btn.concat('ips-button-'+name+'"');
                btn = btn.concat(' onclick="refreshIpsEntryTable(\'' + name + '\')">');
                
                btn = btn.concat(name+'</button>');
                data[e][0] = btn;
                data[e].splice(1, 0, name);
            }
        }

    }
}


