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

    const getRoot = () => root;

    // Returns the tree with a new node
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

    // Returns height of the tree, which is defined as the number of
    // edges in the longest path from a given node to a leaf node
    const height = (node) => {
        if (node === null || !node) return -1;
        const left = height(node.leftChild) + 1;
        const right = height(node.rightChild) + 1;
        return Math.max(left, right);
    };

    // Returns depth of the tree, is defined as the number of edges
    // in the longest path from a given node to the tree’s root node
    const depth = (node) => {
        if (node === null || node === root) return 0;
        let count = 0;
        const currentNode = root;
        while (currentNode !== node) {
            count++;
            if (currentNode.data > node.data) {
                currentNode = currentNode.leftChild;
            }
            if (currentNode.data < node.data) {
                currentNode = currentNode.rightChild;
            }
        }
        return count;
    };

    // Check if the tree is balanced
    const isBalanced = (rootNode = root) => {
        if (rootNode === null) return true;
        if (
            Math.abs(
                height(rootNode.leftChild) - height(rootNode.rightChild)
            ) <= 1 &&
            isBalanced(rootNode.leftChild) === true &&
            isBalanced(rootNode.rightChild) === true
        ) {
            return true;
        }
        return false;
    };

    const traverse = (rootNode = root, array = []) => {
        array.push(rootNode.data);
        if (rootNode.leftChild !== null) traverse(rootNode.leftChild, array);
        if (rootNode.rightChild !== null) traverse(rootNode.rightChild, array);
        return array;
    };

    // Run this if the tree is unbalanced
    const rebalance = () => {
        if (isBalanced()) return;
        const array = traverse();
        const sortedArray = array.sort((a, b) => a - b);
        const noDuplicates = [...new Set(sortedArray)];
        root = buildTree(noDuplicates, 0, noDuplicates.length - 1);
    };

    return {
        getRoot,
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
gumTree.insertValue(2);
prettyPrint(gumTree.getRoot());
console.log(gumTree.findValue(9));
console.log(gumTree.deleteValue(7));
prettyPrint(gumTree.getRoot());
console.log(gumTree.levelOrder());
console.log(gumTree.inOrder());
console.log(gumTree.preOrder());
console.log(gumTree.postOrder());
console.log(gumTree.isBalanced());
gumTree.rebalance();
console.log(gumTree.isBalanced());
prettyPrint(gumTree.getRoot());
