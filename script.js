// Factory fn for creating a new nodes
const Node = (data, leftChild, rightChild) => {
    leftChild = null;
    rightChild = null;
    return { data, leftChild, rightChild };
};

// Console log the tree structure format
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.rightChild !== null) {
        prettyPrint(
            node.rightChild,
            `${prefix}${isLeft ? "│   " : "    "}`,
            false
        );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
        prettyPrint(
            node.leftChild,
            `${prefix}${isLeft ? "    " : "│   "}`,
            true
        );
    }
};

const Tree = (array) => {
    // Returns balanced binary tree
    const buildTree = (prepedArray, start, end) => {
        // Base case: if the tree is empty
        if (start > end) return null;
        const mid = parseInt((start + end) / 2);
        const root = Node(prepedArray[mid]);
        // Recursively construct left subtree
        root.leftChild = buildTree(prepedArray, start, mid - 1);
        // Recursively construct right subtree
        root.rightChild = buildTree(prepedArray, mid + 1, end);
        return root;
    };

    // Sort provided array and remove duplicates
    const sortedArray = array.sort((a, b) => a - b);
    const noDuplicates = [...new Set(sortedArray)];
    let root = buildTree(noDuplicates, 0, noDuplicates.length - 1);

    // Returns BST with a new node and it's value
    const insertValue = (value, rootNode = root) => {
        // Base case: if the tree is empty
        if (rootNode === null) return (rootNode = Node(value));
        // Otherwise recur down the tree
        if (value < rootNode.data) {
            rootNode.leftChild = insertValue(value, rootNode.leftChild);
        } else {
            rootNode.rightChild = insertValue(value, rootNode.rightChild);
        }
        // Return the unchanged root node
        return rootNode;
    };

    const minValue = (root) => {
        let minv = root.data;
        while (root.leftChild != null) {
            minv = root.leftChild.data;
            root = root.leftChild;
        }
        return minv;
    };

    // Delete a node with given value
    const deleteValue = (value, rootNode = root) => {
        if (value === undefined) return `"${value}" not found`;
        // Base case: if the tree is empty
        if (rootNode === null) return rootNode;
        // Otherwise recur down the tree
        if (value < rootNode.data) {
            rootNode.leftChild = deleteValue(value, rootNode.leftChild);
        } else if (value > rootNode.data) {
            rootNode.rightChild = deleteValue(value, rootNode.rightChild);
            // If value is the same as root's data,
            // then this is the node to be deleted
        } else {
            // Node with only one child or no child
            if (rootNode.leftChild === null) {
                return rootNode.rightChild;
            } else if (rootNode.rightChild === null) {
                return rootNode.leftChild;
            }
            // Node with two children: Get the inorder
            // successor (smallest in the right subtree)
            rootNode.data = minValue(rootNode.rightChild);
            // Delete the inorder successor
            rootNode.rightChild = deleteValue(
                rootNode.data,
                rootNode.rightChild
            );
        }
        return rootNode;
    };

    // Returns the node with the given value
    const findValue = (value, rootNode = root) => {
        if (rootNode === null) return `"${value}" not found`;
        if (rootNode.data === value) return rootNode;
        if (value < rootNode.data) {
            return findValue(value, rootNode.leftChild);
        } else if (value > rootNode.data) {
            return findValue(value, rootNode.rightChild);
        }
    };

    // Traverse the tree in breadth-first level order using a queue
    const levelOrder = () => {
        if (root === null) return [];
        const queue = [];
        queue.push(root);
        const result = [];
        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.data);
            if (node.leftChild !== null) queue.push(node.leftChild);
            if (node.rightChild !== null) queue.push(node.rightChild);
        }
        return result;
    };

    // Traverse the tree depth-first inorder
    // Left, root, right
    const inOrder = (rootNode = root, inOrderData = []) => {
        if (rootNode === null) return [];
        if (rootNode.leftChild !== null)
            inOrder(rootNode.leftChild, inOrderData);
        inOrderData.push(rootNode.data);
        if (rootNode.rightChild !== null)
            inOrder(rootNode.rightChild, inOrderData);
        return inOrderData;
    };

    // Traverse the tree depth-first preorder
    // Root, left, right
    const preOrder = (rootNode = root, preOrderData = []) => {
        if (rootNode === null) return [];
        preOrderData.push(rootNode.data);
        if (rootNode.leftChild !== null)
            preOrder(rootNode.leftChild, preOrderData);
        if (rootNode.rightChild !== null)
            preOrder(rootNode.rightChild, preOrderData);
        return preOrderData;
    };

    // Traverse the tree depth-first postorder
    // Left, right, root
    const postOrder = (rootNode = root, postOrderData = []) => {
        if (rootNode === null) return [];
        if (rootNode.leftChild !== null)
            postOrder(rootNode.leftChild, postOrderData);
        if (rootNode.rightChild !== null)
            postOrder(rootNode.rightChild, postOrderData);
        postOrderData.push(rootNode.data);
        return postOrderData;
    };

    // Returns height of the tree
    const height = () => {};

    // Returns depth of the tree
    const depth = () => {};

    // Check if the tree is balanced
    const isBalanced = () => {};

    // Run if the tree is unbalanced
    const rebalance = () => {};

    return {
        root,
        buildTree,
        insertValue,
        deleteValue,
        findValue,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        rebalance,
        prettyPrint,
    };
};

const gumTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
gumTree.insertValue(6);
gumTree.insertValue(50);
gumTree.insertValue(19);
gumTree.insertValue(30);
gumTree.insertValue(29);
gumTree.insertValue(28);
gumTree.insertValue(0);
gumTree.root;
prettyPrint(gumTree.root);
console.log(gumTree.findValue(9));
console.log(gumTree.deleteValue(7));
prettyPrint(gumTree.root);
console.log(gumTree.levelOrder());
console.log(gumTree.inOrder());
console.log(gumTree.preOrder());
console.log(gumTree.postOrder());
