import { Seq, Record, List } from 'immutable';

/* -----------------------------------
 *
 * Overloads
 *
 * -------------------------------- */

function parseJs<T extends object>(data: T[]): List<Record<T> & Readonly<T>>;
function parseJs<T extends object>(data: T): Record<T> & Readonly<T>;

/* -----------------------------------
 *
 * Parse
 *
 * -------------------------------- */

function parseJs<T extends object>(data: T) {
  if (!data) {
    return;
  }

  if (typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return Seq<any>(data).map(parseJs).toList();
  }

  const record = Record(data);

  return new record(Seq<any>(data).map(parseJs));
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { parseJs };
