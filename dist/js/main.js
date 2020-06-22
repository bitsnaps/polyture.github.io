//scroll to early access
function scrollToEarlyAccess() {
    var element = document.querySelector("#early-access");
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

//reload animate on scroll
document.addEventListener("DOMContentLoaded", () => {
    AOS.init();
});

//download menu selector
var download_version = 'windows';
$("a.downloads.item").click(function() {
    $('a.downloads.item').removeClass('active');
    $(this).addClass('active');
    download_version = $(this).attr('id');

    hideAllTabs();
    $('#download-links .row.' + download_version).addClass('active');
    $('#download-links .row.' + download_version).removeClass('hidden');
})

function hideAllTabs() {
    if ($('#download-links .row.windows').hasClass('active')) {
        $('#download-links .row.windows').removeClass('active');
        $('#download-links .row.windows').addClass('hidden');
    }
    if ($('#download-links .row.mac').hasClass('active')) {
        $('#download-links .row.mac').removeClass('active');
        $('#download-links .row.mac').addClass('hidden');
    }
    if ($('#download-links .row.linux').hasClass('active')) {
        $('#download-links .row.linux').removeClass('active');
        $('#download-links .row.linux').addClass('hidden');
    }
}


//modal
MicroModal.init();


//get yaml data

//windows
var yamlFile_windows = YAML.load('https://cors-anywhere.herokuapp.com/https://polyture-releases.sfo2.digitaloceanspaces.com/latest.yml');
var yamlData_windows = new Array();
$.each(yamlFile_windows, function(key, value) {
    yamlData_windows.push(value);
});
var PolytureVersion_windows = yamlData_windows[0];
var DownloadLink_windows = 'https://polyture-releases.sfo2.digitaloceanspaces.com/' + yamlData_windows[1][0].url;
var UploadDate_windows = yamlData_windows[4].substring(0, 10);

//update windows download text
$("#PolytureVersion_windows").text(PolytureVersion_windows);
$("#UploadDate_windows").text(UploadDate_windows);

//mac
var yamlFile_mac = YAML.load('https://cors-anywhere.herokuapp.com/https://polyture-releases.sfo2.digitaloceanspaces.com/latest-mac.yml');
var yamlData_mac = new Array();
$.each(yamlFile_mac, function(key, value) {
    yamlData_mac.push(value);
});
var PolytureVersion_mac = yamlData_mac[0];
var DownloadLink_mac = 'https://polyture-releases.sfo2.digitaloceanspaces.com/' + yamlData_mac[1][1].url;
var UploadDate_mac = yamlData_mac[4].substring(0, 10);

//update mac download text
$("#PolytureVersion_mac").text(PolytureVersion_mac);
$("#UploadDate_mac").text(UploadDate_mac);