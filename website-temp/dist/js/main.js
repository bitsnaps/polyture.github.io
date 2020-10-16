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

//email send

function validateContactForm() {
    return (
        validEmail($('#contact-email').val()) &&
        $('#contact-firstname').val() != '' &&
        $('#contact-lastname').val() != '' &&
        $('#contact-message').val() != '')
}

function clearContactForm() {
    $('#contact-email').val('');
    $('#contact-firstname').val('');
    $('#contact-lastname').val('');
    $('#contact-message').val('');
}

function sendEmail_contact() {
    var firstName = $('#contact-firstname').val();
    var lastName = $('#contact-lastname').val();
    var email = $('#contact-email').val();
    var message = $('#contact-message').val()
    if (validateContactForm()) {
        Email.send({
            SecureToken: '403fe504-0a70-4d73-b461-58e9a7c786bf',
            To: 'contact@polyture.com',
            From: "justin@cloud.polyture.com ",
            Subject: "Contact Form Submission - " + firstName + " " + lastName + " - " + email,
            Body: message
        }).then(
            MicroModal.show('contact-success'),
            clearContactForm()
        );
    } else {
        MicroModal.show('contact-failure')
    }
}

function validateSignupForm() {
    return (
        $('#signup-email').val() != '' &&
        $('#signup-firstname').val() != '' &&
        $('#signup-lastname').val() != '')
}

//submit sign up form 

function initForm() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwFdn55v3rVHrRpRy54CuyjsSsnagVTUwGGL8leMFx0RFOIEqjA/exec';
    const form = document.forms['signup-form'];

    form.addEventListener('submit', e => {
        if (validateSignupForm()) {
            e.preventDefault()
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(MicroModal.show('signup-success'))
                .catch(error => console.error('Error!', error.message))

            //clear form 
            $('#signup-email').val('');
            $('#signup-firstname').val('');
            $('#signup-lastname').val('');
            $('#signup-organization').val('');
        }
    })
}

//sidebar toggle
function toggleSidebar() {
    $('.sidebar').toggleClass('collapsed');
    $('#sidebar-toggle i').toggleClass('hidden');
    $('#overlay').toggleClass('shown');
}

var DownloadLink_mac = "";
var DownloadLink_windows = "";

//get yaml data
function getYamlData() {
    //windows
    var yamlFile_windows = YAML.load('https://polyture-releases.sfo2.digitaloceanspaces.com/latest.yml');
    var yamlData_windows = new Array();
    $.each(yamlFile_windows, function(key, value) {
        yamlData_windows.push(value);
    });
    var PolytureVersion_windows = yamlData_windows[0];
    DownloadLink_windows = 'https://polyture-releases.sfo2.digitaloceanspaces.com/' + yamlData_windows[1][0].url;
    var UploadDate_windows = yamlData_windows[4].substring(0, 10);

    //update windows download text & link
    $("#PolytureVersion_windows").text(PolytureVersion_windows);
    $("#UploadDate_windows").text(UploadDate_windows);

    //mac
    var yamlFile_mac = YAML.load('https://polyture-releases.sfo2.digitaloceanspaces.com/latest-mac.yml');
    var yamlData_mac = new Array();
    $.each(yamlFile_mac, function(key, value) {
        yamlData_mac.push(value);
    });
    var PolytureVersion_mac = yamlData_mac[0];
    DownloadLink_mac = 'https://polyture-releases.sfo2.digitaloceanspaces.com/' + yamlData_mac[1][1].url;
    var UploadDate_mac = yamlData_mac[4].substring(0, 10);

    //update mac download text & link
    $("#PolytureVersion_mac").text(PolytureVersion_mac);
    $("#UploadDate_mac").text(UploadDate_mac);
}