let canvasScript = document.createElement('script');
canvasScript.textContent = `
    HTMLCanvasElement.prototype.getContext = () => console.log("canvas script overwrite working");
`;
(document.head||document.documentElement).appendChild(canvasScript);
canvasScript.remove();