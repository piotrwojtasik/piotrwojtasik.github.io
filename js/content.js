


$(document).scroll(function(){
    var y = $(this).scrollTop();
    if(y > 650) {
        $('#firstMess').show("slow")
    } else {
        $('#firstMess').hide("slow")
    }
})

$(document).scroll(function(){
    var y = $(this).scrollTop();
    if(y > 850) {
        $('#secondMess').show("slow")
    } else {
        $('#secondMess').hide("slow")
    }
})
$(document).scroll(function(){
    var y = $(this).scrollTop();
    if(y > 870) {
        $('#thirdMess').show("slow")
    } else {
        $('#thirdMess').hide("slow")
    }
})

$(document).ready(function() {
    $('#sendButton').click(function(){
        var inputString = $('#warning_field').val();
        if($('#sendButton').data('clicked')) {
            
        } else {
            $('#fourMess').show("slow")
            $('#nickname-chat').html('Nice to meet you '+ inputString +'! I think we gonna be a good friends!')
        }
        
    })
})