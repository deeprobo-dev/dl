function showFiles() {
    // An empty img element
    let demoImage = document.getElementById('idImage');
    // read the file from the user
    let file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        demoImage.src = reader.result;
    }
    reader.readAsDataURL(file);
    app();
}  

function uploadAndClassifyImage(){
    var fileInput = document.getElementById('resnet34FieldUpload').files;
    if (!fileInput.length){
        return alert('Please choose a file to upload first');
    }

    var file = fileInput[0];
    var filename = file.name;

    var formData = new FormData();
    formData.append(filename, file);

    console.log(filename);
    var classes = JSON.parse('{"1": "cat", "208": "Labrador retriever"}');

    $.ajax({
        async: true,
        crossDomain: true,
        method: 'POST',
        url: 'https://4xg6wnbcti.execute-api.ap-south-1.amazonaws.com/dev/detect',
        data: formData,
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data"
    })
    .done(function (response) {
        console.log(response);
        const obj = JSON.parse(response);
        document.getElementById('result').textContent = response;
        document.getElementById('class').textContent = classes[obj.predicted];
    })
    .fail(function() {alert("There was an error while sending prediction request to resnet34 model."); });
};

$('#buttonResNetUpload').click(uploadAndClassifyImage);