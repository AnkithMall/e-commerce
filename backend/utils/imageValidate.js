
const imageValidate = (images) => {
  let imagesTable = [] ;
  if(Array.isArray(images)){
    imagesTable = images ;
  }else{
    imagesTable.push(images) ;
  }
  if(imagesTable.length > 3){
    return { error : "send only 3 images at once" } ;
  }
  for(let image of imagesTable){
    if(image.size > 1048576) return { error : "Size too large (Above 1 MB) " }
    const filetype = /jpg|jpeg|png/ ;
    const mimetype = filetype.test(image.mimetype) ;
    if(!mimetype) return { error : "Incorrect MIME type (Extension should be jpg , jpeg or png) "} 

  }
  return { error: false }
}

module.exports = imageValidate ; 