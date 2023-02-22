//--------------------------------------------------------------------------------
// Functions
//--------------------------------------------------------------------------------

function LoadTableOfContents(others) {
    document.addEventListener("DOMContentLoaded", function(e) {
        let body = document.getElementById('TableOfContents');
        let nodes = document.querySelectorAll("h1, h2, h3");
        let rootHeader = null, lastHeader = null;
        let index = 0;
        for (const node of nodes) {
            // console.log(node.tagName + ' -> ' + node.id + ' -> ' + node.innerHTML);
            let tag = node.tagName.toUpperCase();
            let info = { id: node.id, name: node.innerHTML, children: [] };
            if (tag === "H1") {
                rootHeader = info;
            } if (tag === "H2") {
                index++;
                info.name = index + '. ' + info.name;
                if (rootHeader) {
                    rootHeader.children.push(info);
                    lastHeader = info;
                }
            } if (tag === "H3") {
                if (lastHeader) {
                    lastHeader.children.push(info);
                }
            }
        }
        let firstLevel = CreateListItems(rootHeader);
        if (firstLevel !== '') {
            for (const other of others) {
                firstLevel += CreateListItem(other.url, other.name, '');
            }
            firstLevel += CreateListItem('index.html', 'Volver', '');
            body.innerHTML = CreateUnorderedList(firstLevel);
        }
    });
}

function CreateListItems(root) {
    if (root) {
        let innerItems = '';
        for (const node of root.children) {
            innerItems += CreateListItems(node);
        }
        let innerLevel = CreateUnorderedList(innerItems);
        return CreateListItemFromId(root.id, root.name, innerLevel);
    } else {
        return '';
    }
}

function CreateUnorderedList(inner) {
    return '<ul>' + inner + '</ul>';
}

function CreateListItemFromId(id, name, inner) {
    return CreateListItem('#' + id, name, inner)
}

function CreateListItem(url, name, inner) {
    return '<li><a href="' + url + '">' + name + '</a>' + inner + '</li>';
}
