/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/compress', 'N/file', './jszip.min.js'],
    /**
     * @param{compress} compress - Reference to the N/compress module for compressing files.
     * @param{file} file - Reference to the N/file module for working with files.
     * @param{jszip} jszip - Reference to the external library jszip for working with ZIP files.
     */
    (compress, file, jszip) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext - Context object containing information about the script's execution.
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {

            try{
                // Load the archived file
                const archiveFileId = 6442; // Internal ID of the archive file

                // Call the unzipFile function to extract the contents of the archived file
                const unzippedFilesTest = unzipFile(archiveFileId);
                log.debug("unzippedFilesTest", unzippedFilesTest);

            } catch(e){
                // Log any errors that occur during script execution
                log.error("Error in Script", e.toString());
            }
        };

        /**
         * Extracts the contents of a ZIP file.
         * @param {number} fileId - The internal ID of the ZIP file.
         * @returns {Array} - An array containing objects representing the unzipped files.
         */
        const unzipFile = (fileId) => {
            // Load the ZIP file using its internal ID
            const zippedFile = file.load({id: fileId});
            const zippedFileContent = zippedFile.getContents();
            const unzippedFiles = [];

            // Create a new instance of the jszip library
            const ZipInstance = new jszip();

            // Asynchronously load and extract the contents of the ZIP file
            ZipInstance.sync(function () {
                ZipInstance.loadAsync(zippedFileContent, {base64: true}).then(function (zip) {
                    // Iterate through each file in the ZIP archive
                    Object.keys(zip.files).forEach(function(filename){
                        // Asynchronously read the contents of each file
                        const fileContent =  zip.file(filename).async("string");
                        // Log the contents of the file (for debugging purposes)
                        log.debug("file", fileContent);
                        // Push an object representing the file into the unzippedFiles array
                        unzippedFiles.push({
                            name: filename,
                            content: fileContent._result,
                            size: fileContent._result.length
                        });
                    });
                });
            });

            // Return the array of unzipped files
            return unzippedFiles;
        };

        // Expose the execute function for script execution
        return {
            execute: execute
        };
    }
);
