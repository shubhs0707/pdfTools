const PDFMerger = require('pdf-merger-js');

let merger = new PDFMerger();

const mergePdfs = async (...pdfs) => {
    for (let pdfName of pdfs) {
        await merger.add(pdfName)
    }
    let d = new Date().getTime();


    await merger.save(`public/merged${d}.pdf`); //save under given name and reset the internal document

    // Export the merged PDF as a nodejs Buffer
    // const mergedPdfBuffer = await merger.saveAsBuffer();
    // fs.writeSync('merged.pdf', mergedPdfBuffer);
    return d;
};

module.exports = { mergePdfs };