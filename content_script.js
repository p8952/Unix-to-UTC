function walkDOM(node) {
  let childNode, nextNode;

  if (node.tagName && node.tagName.toLowerCase() == "input") {
    return;
  }

  if (node.tagName && node.tagName.toLowerCase() == "textarea") {
    return;
  }

  if (node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11) {
    childNode = node.firstChild;
    while (childNode) {
      nextNode = childNode.nextSibling;
      walkDOM(childNode);
      childNode = nextNode;
    }
  } else if (node.nodeType === 3) {
    node.nodeValue = replaceTimestamps(node.nodeValue);
  }
}

function replaceTimestamps(targetString) {
  let possibleTimestamp = [];

  for (let i = 0; i < targetString.length; i++) {
    if (targetString.charAt(i).match(/^\d$/)) {
      possibleTimestamp.push(targetString.charAt(i));
    } else {
      if (possibleTimestamp.length === 10 || possibleTimestamp.length === 13) {
        let foundTimestamp = possibleTimestamp.join("");

        targetString = [
          targetString.slice(0, i),
          formatTimestamp(foundTimestamp),
          targetString.slice(i)
        ].join("");
      }

      possibleTimestamp = [];
    }
  }

  if (possibleTimestamp.length === 10 || possibleTimestamp.length === 13) {
    let foundTimestamp = possibleTimestamp.join("");

    targetString = targetString + formatTimestamp(foundTimestamp);
  }

  return targetString;
}

function formatTimestamp(timestampString) {
  let timestampInt = parseInt(timestampString, 10);

  if (timestampString.length === 10) {
    timestampInt = timestampInt * 1000;
  }

  let timestampObj = new Date(timestampInt);

  return (
    "(" +
    timestampObj.getFullYear() +
    "-" +
    ((timestampObj.getMonth() + 1 < 10 ? "0" : "") +
      (timestampObj.getMonth() + 1)) +
    "-" +
    ((timestampObj.getDate() < 10 ? "0" : "") + timestampObj.getDate()) +
    " " +
    ((timestampObj.getHours() < 10 ? "0" : "") + timestampObj.getHours()) +
    ":" +
    ((timestampObj.getMinutes() < 10 ? "0" : "") + timestampObj.getMinutes()) +
    ":" +
    ((timestampObj.getSeconds() < 10 ? "0" : "") + timestampObj.getSeconds()) +
    ")"
  );
}

if (typeof document !== "undefined") {
  walkDOM(document.body);
}
