
/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist
 * in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account
 * that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it
 * into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
  let map = new Map;
    map.set(
        " _ " +
        "| |" +
        "|_|", 0);
    map.set(
        "   " +
        "  |" +
        "  |", 1);
    map.set(
        " _ " +
        " _|" +
        "|_ ", 2);
    map.set(
        " _ " +
        " _|" +
        " _|", 3);
    map.set(
        "   " +
        "|_|" +
        "  |", 4);
    map.set(
        " _ " +
        "|_ " +
        " _|", 5);
    map.set(
        " _ " +
        "|_ " +
        "|_|", 6);
    map.set(
        " _ " +
        "  |" +
        "  |", 7);
    map.set(
        " _ " +
        "|_|" +
        "|_|", 8);
    map.set(
        " _ " +
        "|_|" +
        " _|", 9);

    let lines = bankAccount.split("\n");
    let i = 0, result = "";

    while (i < lines[0].length) {
        let s = lines[0].substr(i, 3) + lines[1].substr(i, 3) + lines[2].substr(i, 3);
        result += map.get(s);

        i += 3;
    }

    return Number(result);
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make
 * sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>
 *      'The String global object',
 *      'is a constructor for',
 *      'strings, or a sequence of',
 *      'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>
 *      'The String',
 *      'global',
 *      'object is a',
 *      'constructor',
 *      'for strings,',
 *      'or a',
 *      'sequence of',
 *      'characters.'
 */
function* wrapText(text, columns) {
   while (text.length) {
        let i = columns;

        if (text.length > i) {
            while (text[i] != " ")
                i--;
        }

        yield text.substr(0, i);
        text = text.substr(i + 1);
    }
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
  StraightFlush: 8,
  FourOfKind: 7,
  FullHouse: 6,
  Flush: 5,
  Straight: 4,
  ThreeOfKind: 3,
  TwoPairs: 2,
  OnePair: 1,
  HighCard: 0
};

const PokerRank = {
    StraightFlush: 8, // +
    FourOfKind: 7,    // +
    FullHouse: 6,     // +
    Flush: 5,         // +
    Straight: 4,      // +
    ThreeOfKind: 3,   // +
    TwoPairs: 2,      // +
    OnePair: 1,       // +
    HighCard: 0       // +
};

function compareCards(hand) {
    let cardMap = new Map(), result = "";
    hand.forEach((value) => {
        let prev = cardMap.get(value.dig);

        cardMap.set(value.dig, prev == undefined ? 1 : prev + 1);
    });

    cardMap.forEach((value) => {
        if (value > 1)
            result += value;
    });

    return result;
}

function isStraight(hand) {
    let lowest = Math.min.apply(null, hand.map(value => value.dig));

    return hand.reduce((previous, current, index) => {
        return previous && (current.dig - lowest == index);
    }, true);
}

function isAceStraight(hand) {
    hand = hand.map((value) => value.dig == 14 ? 1 : value.dig).sort();
    let lowest = Math.min.apply(null, hand);

    return hand.reduce((previous, current, index) => {
        return previous && (current - lowest == index);
    }, true);
}

function isFlush(hand) {
    hand = hand.map((value) => value.mask);

    return (hand[0] == (hand[1] | hand[2] | hand[3] | hand[4]));
}

function getPokerHandRank(hand) {
    hand = hand
        .map((value) => {
            let sec = value.length == 2 ? 1 : 2, dig = value.substr(0, sec),
                masks = new Map([["♠", 1], ["♣", 2], ["♥", 4], ["♦", 8]]),
                cards = new Map([["J", 11], ["Q", 12], ["K", 13], ["A", 14]]);

            if (cards.has(dig))
                dig = cards.get(dig);

            return {dig: Number(dig), mask: masks.get(value.substr(sec))};
        })
        .sort((a, b) => a.dig - b.dig);

    let rank = 0;

    switch (compareCards(hand)) {
        case "4":
            rank = PokerRank.FourOfKind;
            break;

        case "23":
        case "32":
            rank = PokerRank.FullHouse;
            break;

        case "22":
            rank = PokerRank.TwoPairs;
            break;

        case "3":
            rank = PokerRank.ThreeOfKind;
            break;

        case "2":
            rank = PokerRank.OnePair;
            break;

        default:
            if (isStraight(hand) || isAceStraight(hand))
                rank = PokerRank.Straight;
    }

    if (isFlush(hand))
        if (rank == 0)
            rank = PokerRank.Flush;
        else
            rank = PokerRank.StraightFlush;

    return rank;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +,
 * vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 *
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+        '+------------+\n'+
 *    '|            |\n'+        '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+   =>   '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+        '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'         '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
  throw new Error('Not implemented');
}

module.exports = {
  parseBankAccount: parseBankAccount,
  wrapText: wrapText,
  PokerRank: PokerRank,
  getPokerHandRank: getPokerHandRank,
  getFigureRectangles: getFigureRectangles
};
