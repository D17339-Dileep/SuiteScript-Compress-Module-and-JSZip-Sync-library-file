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
                // Load two files with specified IDs (4488 and 4489)
                var objLoadedFileOne = file.load({
                    id: 4488
                });
                var objLoadedFileTwo = file.load({
                    id: 4489
                });

                // Create a new text file with sample content
                var textFile = file.create({
                    name: 'DynamicfileCreation.txt',
                    fileType: 'PLAINTEXT',
                    contents: 'This is sample content.'
                });

                // Create an archive using a temporary file object
                var archiver = compress.createArchiver();

                // Add the loaded files and the text file to the archive
                archiver.add({
                    file: objLoadedFileOne
                });
                archiver.add({
                    file: objLoadedFileTwo
                });
                archiver.add({
                    file: textFile,
                    directory: 'txt/'
                });

                // Create a zip file from the archive
                var zipFile = archiver.archive({
                    name: 'myarchive',
                    type: compress.Type.ZIP
                });

                // Set folder and save the zip file to the file cabinet
                zipFile.folder = 925;
                zipFile.save();

            } catch (e) {
                // Catch any errors that may occur and log them
                log.error("Error in SS Script", e.toString());
            }

          
        }

        return {execute}

    });
