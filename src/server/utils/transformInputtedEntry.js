const entryToBeUpdated = (inputtedEntry) => {
  const newEntry = inputtedEntry;
  delete newEntry.id;
  return newEntry;
};

module.exports = { entryToBeUpdated };
