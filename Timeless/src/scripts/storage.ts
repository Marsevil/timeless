import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite';
import { Capacitor } from '@capacitor/core'

const DB_NAME = 'timeless';
const INIT_SQL_PATH = 'assets/init_db.sql';
const DEFAULT_DATA_SQL_PATH = 'assets/default_data.sql';

const SQLITE = new SQLiteConnection(CapacitorSQLite);

export async function getDBConnection(): Promise<SQLiteDBConnection> {
	let ret = await SQLITE.checkConnectionsConsistency();
	let isConn = (await SQLITE.isConnection(DB_NAME, false)).result;

	let db = null;
	if (ret.result && isConn) {
		db = await SQLITE.retrieveConnection(DB_NAME, false);
	} else {
		db = await SQLITE.createConnection(DB_NAME, false, 'no-encryption', 1, false);
	}

	if (!db) {
		throw 'Database connection can not be initilized.';
	}

	return db;
}

export async function initIfNotExist() {
	const platform = Capacitor.getPlatform();

	// Setup specific platform things
	if (platform === 'web') {
		console.log('Web detected');
		customElements.define('jeep-sqlite', JeepSqlite);
		const jeepSQLiteEl = document.createElement('jeep-sqlite');
		document.body.appendChild(jeepSQLiteEl);

		await SQLITE.initWebStore();
		console.log('Webstore initialized');
	}

	// Init the database if not exist
	const db = await getDBConnection();
	await db.open();
	const isEmpty: boolean = (await db.getTableList()).values.length === 0;

	if (isEmpty) {
		const initQuery = await (await fetch(INIT_SQL_PATH)).text();
		await db.run(initQuery);
		const defaultDataQuery = await (await fetch(DEFAULT_DATA_SQL_PATH)).text();
		await db.run(defaultDataQuery);
		console.log('Database initialized');
	}

	db.close();
}

