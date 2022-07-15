type TagPosition = {
  name: string;
  position: number;
};

type ElementNode = {
  name: string;
  position: number;
  closingTagPosition?: number;
  attributes: { key: string; value: string | null }[];
  children?: ElementNode[];
  textNode?: string;
};

type ElementTree = ElementNode[];

const cleanupAndSplit = (fullTag: String): string[] => {
  return fullTag
    .replace(/^\//g, "")
    .replace(/\s?\/$/g, "")
    .replace(/(<|>)/g, "")
    .split(
      /\s(?=(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*|(?:[^\\]*(['"`])[^'"`]*\1)*[^'"`]*$)/g
    );
};

const createElementTree = (html: string, tagList: TagPosition[]) => {
  const elementTree: ElementTree = [];

  elementTree.push({
    name: cleanupAndSplit(tagList[0].name)[0],
    attributes: [],
    position: tagList[0].position,
  });

  return elementTree;
};

export const htmlParser = (html: string) => {
  const tagPattern = /<.[^>]*>/g;
  const tagMatches = html.match(tagPattern);

  if (tagMatches == null) return "No HTML!";

  const tagData: TagPosition[] = [] as TagPosition[];

  for (const tag of tagMatches) {
    const tagFound = tagData.some((el) => tag === el.name);

    if (!tagFound) {
      tagData.push({ name: tag, position: html.indexOf(tag) });
    } else {
      const prevPosition = tagData
        .filter((el) => el.name === tag)
        .slice(-1)[0].position;

      tagData.push({
        name: tag,
        position: html.indexOf(tag, prevPosition + tag.length),
      });
    }
  }
  const tree = createElementTree(html, tagData);
  return tree;
};
