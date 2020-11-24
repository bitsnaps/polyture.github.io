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
        (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($('#contact-email').val()))&&
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

//submit sign up form prevent default
$('#signup-form').submit(function (evt) {
    evt.preventDefault();
});

//sign up xhr request
function signUp() {
    if(validateSignUpForm()) {
        //sign up - new users link
        var url = "https://stable.aws.polyture.com/v1/accounts/new";

        var xhr = new XMLHttpRequest();
        var data = {
            "email": $('#signup-email').val(),
            "password": $('#signup-password').val()
        };
        xhr.open("POST", url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if(xhr.responseText == '{"success":true,"error":null}') {

                    //sign up - sign up success html
                    window.location.href = "https://polyture.com/html/sign-up/sign-up-success.html"
                }
                else
                    MicroModal.show('signup-failure');
            }
        };
    }
    else
        MicroModal.show('signup-failure');
}

//validate sign up form
function validateSignUpForm() {
    return (
        (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($('#signup-email').val()))&&
        $('#signup-firstname').val() != '' &&
        $('#signup-lastname').val() != '' &&
        $('#signup-password').val() != '' &&
        passwordValidate() &&
        ($('#signup-password').val() == $('#signup-password-confirm').val()))
    }

//password > 10 characters
function passwordValidate() {
    if($('#signup-password').val().length >= 10)
        return true;
    else {
        return false;
    }
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
    //windows yaml location
    var yamlFile_windows = YAML.load('https://polyture-releases-signed.sfo2.digitaloceanspaces.com/latest.yml');
    var yamlData_windows = new Array();
    $.each(yamlFile_windows, function(key, value) {
        yamlData_windows.push(value);
    });
    var PolytureVersion_windows = yamlData_windows[0];
    DownloadLink_windows = 'https://polyture-releases-signed.sfo2.digitaloceanspaces.com/' + yamlData_windows[1][0].url;
    var UploadDate_windows = yamlData_windows[4].substring(0, 10);

    //update windows download text & link
    $("#PolytureVersion_windows").text(PolytureVersion_windows);
    $("#UploadDate_windows").text(UploadDate_windows);

    //mac yaml location
    var yamlFile_mac = YAML.load('https://polyture-releases-signed.sfo2.digitaloceanspaces.com/latest-mac.yml');
    var yamlData_mac = new Array();
    $.each(yamlFile_mac, function(key, value) {
        yamlData_mac.push(value);
    });
    var PolytureVersion_mac = yamlData_mac[0];
    DownloadLink_mac = 'https://polyture-releases-signed.sfo2.digitaloceanspaces.com/' + yamlData_mac[1][1].url;
    var UploadDate_mac = yamlData_mac[4].substring(0, 10);

    //update mac download text & link
    $("#PolytureVersion_mac").text(PolytureVersion_mac);
    $("#UploadDate_mac").text(UploadDate_mac);
}

//prevent default mautic form
document.getElementById("mauticform_input_newsletter_email_address").placeholder = "Email Address";