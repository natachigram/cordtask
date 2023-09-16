// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Board {
    uint256 public numRows = 5;
    uint256 public numColumns = 7;

    enum ColorId {
        noColor,
        black,
        red,
        yellow
    }

    uint256 public cellNumber;
    mapping(uint256 => ColorId) public cellColors;

    function locateCell(uint256 row, uint256 column) public {
        require(row >= 1 && row <= numRows, "Invalid row number");
        require(column >= 1 && column <= numColumns, "Invalid column number");

        // cell formula
        cellNumber = (row - 1) * numColumns + column;

        // Generate a random color to cell
        uint256 randomColorIndex = generateRandomColor();
        cellColors[cellNumber] = ColorId(randomColorIndex);
    }

    function generateRandomColor() internal view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.prevrandao))
        ) % 4;
        return randomNumber;
    }
}
