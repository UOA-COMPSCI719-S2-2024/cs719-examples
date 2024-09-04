/**
 * Builds and executes an SQL UPDATE statement with the given data.
 * 
 * For example, if the tableName = "Customers", and updateData.firstName = "John", updateData.lastName = "Doe",
 * id = 3, and idColumn = "id", then the following statement will be run:
 * 
 * UPDATE Customers SET firstName = 'John', lastName = 'Doe' WHERE id = 3
 * 
 * You are welcome to use this function in your own code.
 * 
 * @author Andrew Meads
 * 
 * @param {any} db the database
 * @param {string} tableName the name of the table to update
 * @param {any} updateData the object containing the update data
 * @param {any} id the primary key
 * @param {string} idColumn the name of the primary key column. Defaults to "id".
 * @returns 
 */
export async function updateDatabase(db, tableName, updateData, id, idColumn = "id") {

    const updateOperations = [];
    const updateParams = [];

    // Build update statement based on props in supplied updateData object.
    for (const prop in updateData) {
        const value = updateData[prop];
        updateOperations.push(`${prop} = ?`);
        updateParams.push(value);
    }

    // Build actual SQL statement
    const sql = `UPDATE ${tableName} SET ${updateOperations.join(", ")} WHERE ${idColumn} = ?`;
    console.log(sql);

    // Execute update and return result
    const dbResult = await db.run(sql, ...updateParams, parseInt(id));
    return dbResult;
}