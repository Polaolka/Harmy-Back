const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = [
  "./routes/api/admin.js",
  "./routes/api/auth.js",
  "./routes/api/typesOfDonats.js",
];
swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./server')
});