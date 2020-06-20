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