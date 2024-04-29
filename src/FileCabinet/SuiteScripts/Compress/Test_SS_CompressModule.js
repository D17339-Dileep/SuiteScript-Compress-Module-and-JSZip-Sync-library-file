/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/compress', 'N/file'],
    /**
 * @param{compress} compress
 * @param{file} file
 */
    (compress, file) => { 

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {

            // Try block to catch and handle any potential errors
            try {
                // Load a file with the specified ID (4488)
                var objLoadedFileOne = file.load({
                    id: 4488
                });
                var objLoadedFileTwo= file.load({
                    id: 4489
                });

                // Log basic information about the loaded file
                log.debug('Name: ' + objLoadedFileOne.name);
                log.debug('Size: ' + objLoadedFileOne.size + 'b');
                log.debug('Contents: ' + objLoadedFileOne.getContents());

                // Gzip (compress) the loaded file
                var gzippedFile = compress.gzip({
                    file: objLoadedFileOne,
                    level: 9
                });

                // Set name and folder for the gzipped file and save it
                gzippedFile.name = "gzipTestFileOne";
                gzippedFile.folder = 925;
                var fileId = gzippedFile.save();

                // Log information about the gzipped file
                log.debug('gzippedFile Name: ' + gzippedFile.name);
                log.debug('gzippedFile Size: ' + gzippedFile.size + 'b');
                log.debug('gzippedFile Contents: ' + gzippedFile.getContents().substring(0, 100));
                log.debug('gzippedFile fileId: ' + fileId);

                // Decompress the gzipped file using gunzip
                var gunzippedFile = compress.gunzip({
                    file: gzippedFile
                });

                // Log information about the gunzipped file
                log.debug('Name: ' + gunzippedFile.name);
                log.debug('File size: ' + gunzippedFile.size + 'b');
                log.debug('Contents: ' + gunzippedFile.getContents());

            } catch (e) {
                // Catch any errors that may occur and log them
                log.error("Error in SS Script", e.toString());
            }


        }

        return {execute}

    });
