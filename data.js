const testData = {
        main: {
          type: 'dataset',
          name: 'test-dataset',
          dateCreated: new Date(Date.now()).toISOString().split('.')[0] + 'Z', // remove milliseconds
          author: 'oceanprotocol-team',
          license: 'MIT',
          files: [
            {
              url: 'https://s3.amazonaws.com/testfiles.oceanprotocol.com/info.0.json',
              checksum: 'efb2c764274b745f5fc37f97c6b0e761',
              contentLength: '4535431',
              contentType: 'text/csv',
              encoding: 'UTF-8',
              compression: 'zip'
            }
          ]
        }
  };
  
  module.exports = { testData };
  