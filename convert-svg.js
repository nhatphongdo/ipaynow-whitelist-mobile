#!/usr/bin/env node
const svgr = require("@svgr/core");
const fs = require("fs");
const path = require("path");

const [, , ...args] = process.argv;
const input = args[0];

if (!input) {
    console.log("Expected a file name or folder.");
    return;
}

const isSvgFileName = !!input.match(".svg");
if (!isSvgFileName) {
    // console.log("Expected an SVG file name.");
    // console.log("Example usage:");
    // console.log("");
    // console.log("react-native-expo-svg test.svg");
    // console.log("");
    // This is a folder
    fs.readdir(input, function(err, files) {
        if (err) {
            return console.log(err);
        }

        files.forEach(function(file, index) {
            // Make one pass and make the file complete
            if (!!file.match(".svg")) {
                var fromPath = path.join(input, file);
                var outputName = `${file
                    .replace(".svg", "")
                    .split(/[\s-]/)
                    .map(string => string.charAt(0).toUpperCase() + string.slice(1))
                    .join("")}`;
                var outputPath = path.join(input, outputName + ".js");
                generateSvg(fromPath, outputPath, outputName);
            }
        });
    });
    return;
} else {
    generateSvg(input);
}

function generateSvg(filename, outputFilename, outputName) {
    fs.readFile(filename, "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }

        const IconName =
            outputName ||
            `${filename
                .replace(".svg", "")
                .split(/[\s-]/)
                .map(string => string.charAt(0).toUpperCase() + string.slice(1))
                .join("")}`;

        svgr.default(
            data,
            {
                native: {
                    expo: false
                },
                expandProps: "end",
                prettier: true,
                svgo: true,
                svgoConfig: {},
                plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
                template: ({ template, types }, opts, { imports, componentName, props, jsx, exports }) => {
                    // Round size
                    let width = 0;
                    let height = 0;
                    for (let i = 0; i < jsx.openingElement.attributes.length; i++) {
                        if (!jsx.openingElement.attributes[i]) {
                            continue;
                        }
                        if (jsx.openingElement.attributes[i].name.name === "width") {
                            width = Math.ceil(jsx.openingElement.attributes[i].value.expression.value);
                            jsx.openingElement.attributes[i].value.expression.value = width + " * ratio";
                        }
                        if (jsx.openingElement.attributes[i].name.name === "height") {
                            height = Math.ceil(jsx.openingElement.attributes[i].value.expression.value);
                            jsx.openingElement.attributes[i].value.expression.value = height + " * ratio";
                        }
                    }

                    // Process LinearGradient
                    for (let i = 0; i < jsx.children.length; i++) {
                        if (jsx.children[i].openingElement.name.name !== "defs") {
                            continue;
                        }
                        for (let j = 0; j < jsx.children[i].children.length; j++) {
                            if (jsx.children[i].children[j].openingElement.name.name !== "linearGradient") {
                                continue;
                            }

                            for (let ai = 0; ai < jsx.children[i].children[j].openingElement.attributes.length; ai++) {
                                if (jsx.children[i].children[j].openingElement.attributes[ai].name.name === "x1") {
                                    jsx.children[i].children[j].openingElement.attributes[ai].value.expression.value = "start[0]";
                                }
                                if (jsx.children[i].children[j].openingElement.attributes[ai].name.name === "y1") {
                                    jsx.children[i].children[j].openingElement.attributes[ai].value.expression.value = "start[1]";
                                }
                                if (jsx.children[i].children[j].openingElement.attributes[ai].name.name === "x2") {
                                    jsx.children[i].children[j].openingElement.attributes[ai].value.expression.value = "end[0]";
                                }
                                if (jsx.children[i].children[j].openingElement.attributes[ai].name.name === "y2") {
                                    jsx.children[i].children[j].openingElement.attributes[ai].value.expression.value = "end[0]";
                                }
                            }

                            const stop = types.jsxElement(
                                types.jsxOpeningElement(
                                    types.jsxIdentifier("stop"),
                                    [
                                        types.jsxAttribute(types.jsxIdentifier("key"), types.jsxExpressionContainer(types.identifier("index"))),
                                        types.jsxAttribute(
                                            types.jsxIdentifier("offset"),
                                            types.jsxExpressionContainer(types.identifier("offsets ? offsets[index] : index"))
                                        ),
                                        types.jsxAttribute(types.jsxIdentifier("stopColor"), types.jsxExpressionContainer(types.identifier("color")))
                                    ],
                                    true
                                ),
                                null,
                                [],
                                true
                            );

                            const map = types.arrowFunctionExpression([types.identifier("color"), types.identifier("index")], stop);

                            const colors = types.callExpression(types.memberExpression(types.identifier("colors"), types.identifier("map")), [map]);
                            jsx.children[i].children[j].children = [types.jsxExpressionContainer(colors)];
                        }
                    }

                    // Process other elements
                    for (let i = 0; i < jsx.children.length; i++) {
                        if (jsx.children[i].openingElement.name.name === "defs") {
                            continue;
                        }

                        // Add scale
                        jsx.children[i].openingElement.attributes.push(
                            types.jsxAttribute(types.jsxIdentifier("scale"), types.jsxExpressionContainer(types.identifier("ratio")))
                        );
                    }

                    const ratio = `let ratio = 1;
    if (width && height) {
        ratio = Math.min(width / ${width}, height / ${height});
    } else if (width) {
        ratio = width / ${width};
    } else if (height) {
        ratio = height / ${height};
    }`;
                    return template.ast`${imports}
                    const ${componentName} = (${props}) => {
                        const {width, height, start, end, offsets, colors, ...others } = props;
                        ${ratio}
                        return ${jsx}
                    }
                    ${exports}
                    `;
                }
            },
            { componentName: IconName }
        ).then(jsCode => {
            // Replace {...props} with {...others}
            jsCode = jsCode.replace("{...props}", "{...others}");
            fs.writeFile(`${outputFilename || IconName + ".js"}`, jsCode, "utf8", function(err) {
                if (err) return console.log(err);
                console.log("");
                console.log(`✨ Saved as ${outputFilename || IconName + ".js"}`);
                console.log("");
            });
        });
    });
}
