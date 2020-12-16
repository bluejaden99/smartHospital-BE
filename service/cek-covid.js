const s1 = "Anda kemungkinan terkena virus corona. Hubingi hotline RS Soebandi No telpon (0331) 487441 untuk pemeriksaan lebih lanjut. Lakukan social distance, gunakan masker, cuci tangan dengan teratur, dan lakukan isolasi diri di rumah"
const s2 = "Ada kemungkinan anda terkena virus corona. Lakukan social distance, gunakan masker, cuci tangan dengan teratur, lakukan isolasi diri di rumah. Jika terjadi perubahan dalam kurun waktu 14 hari, muncul gejala demam > 38°C, batuk, pilek dan sesak tidak mereda maka periksakan diri ke puskesmas atau dokter terdekat"
const s3 = "Anda tidak terkena virus corona. Jaga kesehatan dan tetap waspada dengan melakukan social distance atau tetap berada di rumah, cuci tangan secara teratur, minum vitamin, istirahat yang cukup, dan makan makanan bergizi"

function countInArray(array, what) {
  return array.filter(item => item == what).length;
}

function cek_kondisi(data){
  for (i = 0; i < data.length; i++) {
    if(data[i] === 0 && ((i!=2)||i!=3)||(i!=6))
      return s2
    else return s1
  }
}

function cek_covid(data){
  let yes = countInArray(data, 1)
  let no = countInArray(data,0)
  if(no===6){
    return s3
  }
  else if(no>3){
    return s2
  }
  else return cek_kondisi(data)
};

module.exports = cek_covid
