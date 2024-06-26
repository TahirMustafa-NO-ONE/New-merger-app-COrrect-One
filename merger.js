
import PDFMerger from 'pdf-merger-js';


const mergerpdf = async (p1, p2) => {

  var merger = new PDFMerger();

  await merger.add(p1);  
  await merger.add(p2); 
  let d = new Date().getTime();

  await merger.save(`public/${d}.pdf`); 
  return d;

}

export {mergerpdf};
