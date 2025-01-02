## :toolbox: Functions

- [parseInfoResponse](#gear-parseinforesponse)
- [createGet](#gear-createget)
- [createGetDel](#gear-creategetdel)
- [createGetRange](#gear-creategetrange)
- [createSet](#gear-createset)
- [createPing](#gear-createping)
- [createInfo](#gear-createinfo)
- [createDel](#gear-createdel)
- [createSelect](#gear-createselect)
- [createClientGetName](#gear-createclientgetname)
- [createConfigRewrite](#gear-createconfigrewrite)
- [createConfigResetStat](#gear-createconfigresetstat)
- [createMGet](#gear-createmget)
- [createMSet](#gear-createmset)
- [createMSetNX](#gear-createmsetnx)
- [createIncr](#gear-createincr)
- [createIncrBy](#gear-createincrby)
- [createIncrByFloat](#gear-createincrbyfloat)
- [createClientId](#gear-createclientid)
- [createConfigGet](#gear-createconfigget)
- [createConfigSet](#gear-createconfigset)
- [createHGet](#gear-createhget)
- [convertFieldsAndValuesToHashDataType](#gear-convertfieldsandvaluestohashdatatype)
- [createHSet](#gear-createhset)
- [createHKeys](#gear-createhkeys)
- [createHSetNX](#gear-createhsetnx)
- [createDecr](#gear-createdecr)
- [createDecrBy](#gear-createdecrby)
- [createBitOp](#gear-createbitop)
- [createGetBit](#gear-creategetbit)
- [createSetBit](#gear-createsetbit)
- [createBitField](#gear-createbitfield)
- [createHDel](#gear-createhdel)
- [createHMGet](#gear-createhmget)
- [createHExists](#gear-createhexists)
- [createHGetAll](#gear-createhgetall)
- [createLPush](#gear-createlpush)
- [createLPushX](#gear-createlpushx)
- [createLPop](#gear-createlpop)
- [createLRange](#gear-createlrange)
- [createLLen](#gear-createllen)
- [createLMove](#gear-createlmove)
- [createBLMove](#gear-createblmove)
- [createLSet](#gear-createlset)
- [createLTrim](#gear-createltrim)
- [createLRem](#gear-createlrem)
- [createRPush](#gear-createrpush)
- [createRPushX](#gear-createrpushx)
- [createRPop](#gear-createrpop)
- [createSAdd](#gear-createsadd)
- [createSRem](#gear-createsrem)
- [createSScan](#gear-createsscan)
- [createSMembers](#gear-createsmembers)
- [createSMove](#gear-createsmove)
- [createSCard](#gear-createscard)
- [createSInter](#gear-createsinter)
- [createSInterCard](#gear-createsintercard)
- [createSInterStore](#gear-createsinterstore)
- [createSDiff](#gear-createsdiff)
- [createSDiffStore](#gear-createsdiffstore)
- [createSUnion](#gear-createsunion)
- [createSUnionStore](#gear-createsunionstore)
- [createSIsMember](#gear-createsismember)
- [createSMIsMember](#gear-createsmismember)
- [createSPop](#gear-createspop)
- [createSRandMember](#gear-createsrandmember)
- [createCustomCommand](#gear-createcustomcommand)
- [createHIncrBy](#gear-createhincrby)
- [createHIncrByFloat](#gear-createhincrbyfloat)
- [createHLen](#gear-createhlen)
- [createHVals](#gear-createhvals)
- [createExists](#gear-createexists)
- [createUnlink](#gear-createunlink)
- [createExpire](#gear-createexpire)
- [createExpireAt](#gear-createexpireat)
- [createExpireTime](#gear-createexpiretime)
- [createPExpire](#gear-createpexpire)
- [createPExpireAt](#gear-createpexpireat)
- [createPExpireTime](#gear-createpexpiretime)
- [createTTL](#gear-createttl)
- [convertElementsAndScores](#gear-convertelementsandscores)
- [createZAdd](#gear-createzadd)
- [createZInterstore](#gear-createzinterstore)
- [createZInter](#gear-createzinter)
- [createZUnion](#gear-createzunion)
- [createZRem](#gear-createzrem)
- [createZCard](#gear-createzcard)
- [createZInterCard](#gear-createzintercard)
- [createZDiff](#gear-createzdiff)
- [createZDiffWithScores](#gear-createzdiffwithscores)
- [createZDiffStore](#gear-createzdiffstore)
- [createZScore](#gear-createzscore)
- [createZUnionStore](#gear-createzunionstore)
- [createZMScore](#gear-createzmscore)
- [createScan](#gear-createscan)
- [createZCount](#gear-createzcount)
- [createZRange](#gear-createzrange)
- [createZRangeWithScores](#gear-createzrangewithscores)
- [createZRangeStore](#gear-createzrangestore)
- [createType](#gear-createtype)
- [createStrlen](#gear-createstrlen)
- [createLIndex](#gear-createlindex)
- [createLInsert](#gear-createlinsert)
- [createZPopMin](#gear-createzpopmin)
- [createZPopMax](#gear-createzpopmax)
- [createEcho](#gear-createecho)
- [createPTTL](#gear-createpttl)
- [createZRemRangeByRank](#gear-createzremrangebyrank)
- [createZRemRangeByLex](#gear-createzremrangebylex)
- [createZRemRangeByScore](#gear-createzremrangebyscore)
- [createPersist](#gear-createpersist)
- [createZLexCount](#gear-createzlexcount)
- [createZRank](#gear-createzrank)
- [createXAdd](#gear-createxadd)
- [createXDel](#gear-createxdel)
- [createXTrim](#gear-creatextrim)
- [createXRange](#gear-createxrange)
- [createXRevRange](#gear-createxrevrange)
- [createXGroupCreateConsumer](#gear-createxgroupcreateconsumer)
- [createXGroupDelConsumer](#gear-createxgroupdelconsumer)
- [createTime](#gear-createtime)
- [createPublish](#gear-createpublish)
- [createBRPop](#gear-createbrpop)
- [createBLPop](#gear-createblpop)
- [createFCall](#gear-createfcall)
- [createFCallReadOnly](#gear-createfcallreadonly)
- [createFunctionDelete](#gear-createfunctiondelete)
- [createFunctionFlush](#gear-createfunctionflush)
- [createFunctionLoad](#gear-createfunctionload)
- [createFunctionList](#gear-createfunctionlist)
- [createFunctionStats](#gear-createfunctionstats)
- [createFunctionKill](#gear-createfunctionkill)
- [createFunctionDump](#gear-createfunctiondump)
- [createFunctionRestore](#gear-createfunctionrestore)
- [createBitCount](#gear-createbitcount)
- [createBitPos](#gear-createbitpos)
- [convertKeysAndEntries](#gear-convertkeysandentries)
- [createXRead](#gear-createxread)
- [createXReadGroup](#gear-createxreadgroup)
- [createXInfoStream](#gear-createxinfostream)
- [createXInfoGroups](#gear-createxinfogroups)
- [createXLen](#gear-createxlen)
- [createXPending](#gear-createxpending)
- [createXInfoConsumers](#gear-createxinfoconsumers)
- [createXClaim](#gear-createxclaim)
- [createXAutoClaim](#gear-createxautoclaim)
- [createXGroupCreate](#gear-createxgroupcreate)
- [createXGroupDestroy](#gear-createxgroupdestroy)
- [createRename](#gear-createrename)
- [createRenameNX](#gear-createrenamenx)
- [createPfAdd](#gear-createpfadd)
- [createPfCount](#gear-createpfcount)
- [createPfMerge](#gear-createpfmerge)
- [createObjectEncoding](#gear-createobjectencoding)
- [createObjectFreq](#gear-createobjectfreq)
- [createObjectIdletime](#gear-createobjectidletime)
- [createObjectRefcount](#gear-createobjectrefcount)
- [createLolwut](#gear-createlolwut)
- [createFlushAll](#gear-createflushall)
- [createFlushDB](#gear-createflushdb)
- [createCopy](#gear-createcopy)
- [createMove](#gear-createmove)
- [createDump](#gear-createdump)
- [createRestore](#gear-createrestore)
- [createLPos](#gear-createlpos)
- [createDBSize](#gear-createdbsize)
- [createGeoAdd](#gear-creategeoadd)
- [createGeoPos](#gear-creategeopos)
- [createGeoDist](#gear-creategeodist)
- [createGeoHash](#gear-creategeohash)
- [createGeoSearch](#gear-creategeosearch)
- [createGeoSearchStore](#gear-creategeosearchstore)
- [createZRevRank](#gear-createzrevrank)
- [createZRevRankWithScore](#gear-createzrevrankwithscore)
- [createZMPop](#gear-createzmpop)
- [createBZMPop](#gear-createbzmpop)
- [createZIncrBy](#gear-createzincrby)
- [createSort](#gear-createsort)
- [createSortReadOnly](#gear-createsortreadonly)
- [createHStrlen](#gear-createhstrlen)
- [createHRandField](#gear-createhrandfield)
- [createHScan](#gear-createhscan)
- [createZRandMember](#gear-createzrandmember)
- [createLastSave](#gear-createlastsave)
- [createLCS](#gear-createlcs)
- [createTouch](#gear-createtouch)
- [createRandomKey](#gear-createrandomkey)
- [createWatch](#gear-createwatch)
- [createUnWatch](#gear-createunwatch)
- [createWait](#gear-createwait)
- [createZScan](#gear-createzscan)
- [createSetRange](#gear-createsetrange)
- [createAppend](#gear-createappend)
- [createLMPop](#gear-createlmpop)
- [createBLMPop](#gear-createblmpop)
- [createPubSubChannels](#gear-createpubsubchannels)
- [createPubSubNumPat](#gear-createpubsubnumpat)
- [createPubSubNumSub](#gear-createpubsubnumsub)
- [createPubsubShardChannels](#gear-createpubsubshardchannels)
- [createPubSubShardNumSub](#gear-createpubsubshardnumsub)
- [createBZPopMax](#gear-createbzpopmax)
- [createBZPopMin](#gear-createbzpopmin)
- [createScriptShow](#gear-createscriptshow)
- [createGetEx](#gear-creategetex)
- [createXAck](#gear-createxack)
- [createXGroupSetid](#gear-createxgroupsetid)
- [createScriptExists](#gear-createscriptexists)
- [createScriptFlush](#gear-createscriptflush)
- [createScriptKill](#gear-createscriptkill)
- [convertGlideRecord](#gear-convertgliderecord)
- [convertGlideRecordToRecord](#gear-convertgliderecordtorecord)
- [isGlideRecord](#gear-isgliderecord)
- [convertRecordToGlideRecord](#gear-convertrecordtogliderecord)

### :gear: parseInfoResponse

| Function | Type |
| ---------- | ---------- |
| `parseInfoResponse` | `(response: string) => Record<string, string>` |

### :gear: createGet

| Function | Type |
| ---------- | ---------- |
| `createGet` | `(key: any) => command_request.Command` |

### :gear: createGetDel

| Function | Type |
| ---------- | ---------- |
| `createGetDel` | `(key: any) => command_request.Command` |

### :gear: createGetRange

| Function | Type |
| ---------- | ---------- |
| `createGetRange` | `(key: any, start: number, end: number) => command_request.Command` |

### :gear: createSet

| Function | Type |
| ---------- | ---------- |
| `createSet` | `(key: any, value: any, options?: SetOptions or undefined) => command_request.Command` |

### :gear: createPing

| Function | Type |
| ---------- | ---------- |
| `createPing` | `(str?: any) => command_request.Command` |

### :gear: createInfo

| Function | Type |
| ---------- | ---------- |
| `createInfo` | `(options?: InfoOptions[] or undefined) => command_request.Command` |

### :gear: createDel

| Function | Type |
| ---------- | ---------- |
| `createDel` | `(keys: any[]) => command_request.Command` |

### :gear: createSelect

| Function | Type |
| ---------- | ---------- |
| `createSelect` | `(index: number) => command_request.Command` |

### :gear: createClientGetName

| Function | Type |
| ---------- | ---------- |
| `createClientGetName` | `() => command_request.Command` |

### :gear: createConfigRewrite

| Function | Type |
| ---------- | ---------- |
| `createConfigRewrite` | `() => command_request.Command` |

### :gear: createConfigResetStat

| Function | Type |
| ---------- | ---------- |
| `createConfigResetStat` | `() => command_request.Command` |

### :gear: createMGet

| Function | Type |
| ---------- | ---------- |
| `createMGet` | `(keys: any[]) => command_request.Command` |

### :gear: createMSet

| Function | Type |
| ---------- | ---------- |
| `createMSet` | `(keysAndValues: GlideRecord<any>) => command_request.Command` |

### :gear: createMSetNX

| Function | Type |
| ---------- | ---------- |
| `createMSetNX` | `(keysAndValues: GlideRecord<any>) => command_request.Command` |

### :gear: createIncr

| Function | Type |
| ---------- | ---------- |
| `createIncr` | `(key: any) => command_request.Command` |

### :gear: createIncrBy

| Function | Type |
| ---------- | ---------- |
| `createIncrBy` | `(key: any, amount: number) => command_request.Command` |

### :gear: createIncrByFloat

| Function | Type |
| ---------- | ---------- |
| `createIncrByFloat` | `(key: any, amount: number) => command_request.Command` |

### :gear: createClientId

| Function | Type |
| ---------- | ---------- |
| `createClientId` | `() => command_request.Command` |

### :gear: createConfigGet

| Function | Type |
| ---------- | ---------- |
| `createConfigGet` | `(parameters: string[]) => command_request.Command` |

### :gear: createConfigSet

| Function | Type |
| ---------- | ---------- |
| `createConfigSet` | `(parameters: Record<string, any>) => command_request.Command` |

### :gear: createHGet

| Function | Type |
| ---------- | ---------- |
| `createHGet` | `(key: any, field: any) => command_request.Command` |

### :gear: convertFieldsAndValuesToHashDataType

This function converts an input from {@link HashDataType} or `Record` types to `HashDataType`.

| Function | Type |
| ---------- | ---------- |
| `convertFieldsAndValuesToHashDataType` | `(fieldsAndValues: Record<string, any> or HashDataType) => HashDataType` |

Parameters:

* `fieldsAndValues`: - field names and their values.


### :gear: createHSet

| Function | Type |
| ---------- | ---------- |
| `createHSet` | `(key: any, fieldValueList: HashDataType) => command_request.Command` |

### :gear: createHKeys

| Function | Type |
| ---------- | ---------- |
| `createHKeys` | `(key: any) => command_request.Command` |

### :gear: createHSetNX

| Function | Type |
| ---------- | ---------- |
| `createHSetNX` | `(key: any, field: any, value: any) => command_request.Command` |

### :gear: createDecr

| Function | Type |
| ---------- | ---------- |
| `createDecr` | `(key: any) => command_request.Command` |

### :gear: createDecrBy

| Function | Type |
| ---------- | ---------- |
| `createDecrBy` | `(key: any, amount: number) => command_request.Command` |

### :gear: createBitOp

| Function | Type |
| ---------- | ---------- |
| `createBitOp` | `(operation: BitwiseOperation, destination: any, keys: any[]) => command_request.Command` |

### :gear: createGetBit

| Function | Type |
| ---------- | ---------- |
| `createGetBit` | `(key: any, offset: number) => command_request.Command` |

### :gear: createSetBit

| Function | Type |
| ---------- | ---------- |
| `createSetBit` | `(key: any, offset: number, value: number) => command_request.Command` |

### :gear: createBitField

| Function | Type |
| ---------- | ---------- |
| `createBitField` | `(key: any, subcommands: BitFieldSubCommands[], readOnly?: boolean) => command_request.Command` |

### :gear: createHDel

| Function | Type |
| ---------- | ---------- |
| `createHDel` | `(key: any, fields: any[]) => command_request.Command` |

### :gear: createHMGet

| Function | Type |
| ---------- | ---------- |
| `createHMGet` | `(key: any, fields: any[]) => command_request.Command` |

### :gear: createHExists

| Function | Type |
| ---------- | ---------- |
| `createHExists` | `(key: any, field: any) => command_request.Command` |

### :gear: createHGetAll

| Function | Type |
| ---------- | ---------- |
| `createHGetAll` | `(key: any) => command_request.Command` |

### :gear: createLPush

| Function | Type |
| ---------- | ---------- |
| `createLPush` | `(key: any, elements: any[]) => command_request.Command` |

### :gear: createLPushX

| Function | Type |
| ---------- | ---------- |
| `createLPushX` | `(key: any, elements: any[]) => command_request.Command` |

### :gear: createLPop

| Function | Type |
| ---------- | ---------- |
| `createLPop` | `(key: any, count?: number or undefined) => command_request.Command` |

### :gear: createLRange

| Function | Type |
| ---------- | ---------- |
| `createLRange` | `(key: any, start: number, end: number) => command_request.Command` |

### :gear: createLLen

| Function | Type |
| ---------- | ---------- |
| `createLLen` | `(key: any) => command_request.Command` |

### :gear: createLMove

| Function | Type |
| ---------- | ---------- |
| `createLMove` | `(source: any, destination: any, whereFrom: ListDirection, whereTo: ListDirection) => command_request.Command` |

### :gear: createBLMove

| Function | Type |
| ---------- | ---------- |
| `createBLMove` | `(source: any, destination: any, whereFrom: ListDirection, whereTo: ListDirection, timeout: number) => command_request.Command` |

### :gear: createLSet

| Function | Type |
| ---------- | ---------- |
| `createLSet` | `(key: any, index: number, element: any) => command_request.Command` |

### :gear: createLTrim

| Function | Type |
| ---------- | ---------- |
| `createLTrim` | `(key: any, start: number, end: number) => command_request.Command` |

### :gear: createLRem

| Function | Type |
| ---------- | ---------- |
| `createLRem` | `(key: any, count: number, element: any) => command_request.Command` |

### :gear: createRPush

| Function | Type |
| ---------- | ---------- |
| `createRPush` | `(key: any, elements: any[]) => command_request.Command` |

### :gear: createRPushX

| Function | Type |
| ---------- | ---------- |
| `createRPushX` | `(key: any, elements: any[]) => command_request.Command` |

### :gear: createRPop

| Function | Type |
| ---------- | ---------- |
| `createRPop` | `(key: any, count?: number or undefined) => command_request.Command` |

### :gear: createSAdd

| Function | Type |
| ---------- | ---------- |
| `createSAdd` | `(key: any, members: any[]) => command_request.Command` |

### :gear: createSRem

| Function | Type |
| ---------- | ---------- |
| `createSRem` | `(key: any, members: any[]) => command_request.Command` |

### :gear: createSScan

| Function | Type |
| ---------- | ---------- |
| `createSScan` | `(key: any, cursor: any, options?: BaseScanOptions or undefined) => command_request.Command` |

### :gear: createSMembers

| Function | Type |
| ---------- | ---------- |
| `createSMembers` | `(key: any) => command_request.Command` |

### :gear: createSMove

| Function | Type |
| ---------- | ---------- |
| `createSMove` | `(source: any, destination: any, member: any) => command_request.Command` |

### :gear: createSCard

| Function | Type |
| ---------- | ---------- |
| `createSCard` | `(key: any) => command_request.Command` |

### :gear: createSInter

| Function | Type |
| ---------- | ---------- |
| `createSInter` | `(keys: any[]) => command_request.Command` |

### :gear: createSInterCard

| Function | Type |
| ---------- | ---------- |
| `createSInterCard` | `(keys: any[], limit?: number or undefined) => command_request.Command` |

### :gear: createSInterStore

| Function | Type |
| ---------- | ---------- |
| `createSInterStore` | `(destination: any, keys: any[]) => command_request.Command` |

### :gear: createSDiff

| Function | Type |
| ---------- | ---------- |
| `createSDiff` | `(keys: any[]) => command_request.Command` |

### :gear: createSDiffStore

| Function | Type |
| ---------- | ---------- |
| `createSDiffStore` | `(destination: any, keys: any[]) => command_request.Command` |

### :gear: createSUnion

| Function | Type |
| ---------- | ---------- |
| `createSUnion` | `(keys: any[]) => command_request.Command` |

### :gear: createSUnionStore

| Function | Type |
| ---------- | ---------- |
| `createSUnionStore` | `(destination: any, keys: any[]) => command_request.Command` |

### :gear: createSIsMember

| Function | Type |
| ---------- | ---------- |
| `createSIsMember` | `(key: any, member: any) => command_request.Command` |

### :gear: createSMIsMember

| Function | Type |
| ---------- | ---------- |
| `createSMIsMember` | `(key: any, members: any[]) => command_request.Command` |

### :gear: createSPop

| Function | Type |
| ---------- | ---------- |
| `createSPop` | `(key: any, count?: number or undefined) => command_request.Command` |

### :gear: createSRandMember

| Function | Type |
| ---------- | ---------- |
| `createSRandMember` | `(key: any, count?: number or undefined) => command_request.Command` |

### :gear: createCustomCommand

| Function | Type |
| ---------- | ---------- |
| `createCustomCommand` | `(args: any[]) => command_request.Command` |

### :gear: createHIncrBy

| Function | Type |
| ---------- | ---------- |
| `createHIncrBy` | `(key: any, field: any, amount: number) => command_request.Command` |

### :gear: createHIncrByFloat

| Function | Type |
| ---------- | ---------- |
| `createHIncrByFloat` | `(key: any, field: any, amount: number) => command_request.Command` |

### :gear: createHLen

| Function | Type |
| ---------- | ---------- |
| `createHLen` | `(key: any) => command_request.Command` |

### :gear: createHVals

| Function | Type |
| ---------- | ---------- |
| `createHVals` | `(key: any) => command_request.Command` |

### :gear: createExists

| Function | Type |
| ---------- | ---------- |
| `createExists` | `(keys: any[]) => command_request.Command` |

### :gear: createUnlink

| Function | Type |
| ---------- | ---------- |
| `createUnlink` | `(keys: any[]) => command_request.Command` |

### :gear: createExpire

| Function | Type |
| ---------- | ---------- |
| `createExpire` | `(key: any, seconds: number, option?: ExpireOptions or undefined) => command_request.Command` |

### :gear: createExpireAt

| Function | Type |
| ---------- | ---------- |
| `createExpireAt` | `(key: any, unixSeconds: number, option?: ExpireOptions or undefined) => command_request.Command` |

### :gear: createExpireTime

| Function | Type |
| ---------- | ---------- |
| `createExpireTime` | `(key: any) => command_request.Command` |

### :gear: createPExpire

| Function | Type |
| ---------- | ---------- |
| `createPExpire` | `(key: any, milliseconds: number, option?: ExpireOptions or undefined) => command_request.Command` |

### :gear: createPExpireAt

| Function | Type |
| ---------- | ---------- |
| `createPExpireAt` | `(key: any, unixMilliseconds: number, option?: ExpireOptions or undefined) => command_request.Command` |

### :gear: createPExpireTime

| Function | Type |
| ---------- | ---------- |
| `createPExpireTime` | `(key: any) => command_request.Command` |

### :gear: createTTL

| Function | Type |
| ---------- | ---------- |
| `createTTL` | `(key: any) => command_request.Command` |

### :gear: convertElementsAndScores

| Function | Type |
| ---------- | ---------- |
| `convertElementsAndScores` | `(membersAndScores: SortedSetDataType or Record<string, number>) => SortedSetDataType` |

### :gear: createZAdd

| Function | Type |
| ---------- | ---------- |
| `createZAdd` | `(key: any, membersAndScores: SortedSetDataType, options?: ZAddOptions or undefined, incr?: boolean) => command_request.Command` |

### :gear: createZInterstore

| Function | Type |
| ---------- | ---------- |
| `createZInterstore` | `(destination: any, keys: any[] or KeyWeight[], aggregationType?: AggregationType or undefined) => command_request.Command` |

### :gear: createZInter

| Function | Type |
| ---------- | ---------- |
| `createZInter` | `(keys: any[] or KeyWeight[], aggregationType?: AggregationType or undefined, withScores?: boolean or undefined) => command_request.Command` |

### :gear: createZUnion

| Function | Type |
| ---------- | ---------- |
| `createZUnion` | `(keys: any[] or KeyWeight[], aggregationType?: AggregationType or undefined, withScores?: boolean or undefined) => command_request.Command` |

### :gear: createZRem

| Function | Type |
| ---------- | ---------- |
| `createZRem` | `(key: any, members: any[]) => command_request.Command` |

### :gear: createZCard

| Function | Type |
| ---------- | ---------- |
| `createZCard` | `(key: any) => command_request.Command` |

### :gear: createZInterCard

| Function | Type |
| ---------- | ---------- |
| `createZInterCard` | `(keys: any[], limit?: number or undefined) => command_request.Command` |

### :gear: createZDiff

| Function | Type |
| ---------- | ---------- |
| `createZDiff` | `(keys: any[]) => command_request.Command` |

### :gear: createZDiffWithScores

| Function | Type |
| ---------- | ---------- |
| `createZDiffWithScores` | `(keys: any[]) => command_request.Command` |

### :gear: createZDiffStore

| Function | Type |
| ---------- | ---------- |
| `createZDiffStore` | `(destination: any, keys: any[]) => command_request.Command` |

### :gear: createZScore

| Function | Type |
| ---------- | ---------- |
| `createZScore` | `(key: any, member: any) => command_request.Command` |

### :gear: createZUnionStore

| Function | Type |
| ---------- | ---------- |
| `createZUnionStore` | `(destination: any, keys: any[] or KeyWeight[], aggregationType?: AggregationType or undefined) => command_request.Command` |

### :gear: createZMScore

| Function | Type |
| ---------- | ---------- |
| `createZMScore` | `(key: any, members: any[]) => command_request.Command` |

### :gear: createScan

| Function | Type |
| ---------- | ---------- |
| `createScan` | `(cursor: any, options?: ScanOptions or undefined) => command_request.Command` |

### :gear: createZCount

| Function | Type |
| ---------- | ---------- |
| `createZCount` | `(key: any, minScore: Boundary<number>, maxScore: Boundary<number>) => command_request.Command` |

### :gear: createZRange

| Function | Type |
| ---------- | ---------- |
| `createZRange` | `(key: any, rangeQuery: RangeByScore or RangeByLex or RangeByIndex, reverse?: boolean) => command_request.Command` |

### :gear: createZRangeWithScores

| Function | Type |
| ---------- | ---------- |
| `createZRangeWithScores` | `(key: any, rangeQuery: RangeByScore or RangeByLex or RangeByIndex, reverse?: boolean) => command_request.Command` |

### :gear: createZRangeStore

| Function | Type |
| ---------- | ---------- |
| `createZRangeStore` | `(destination: any, source: any, rangeQuery: RangeByScore or RangeByLex or RangeByIndex, reverse?: boolean) => command_request.Command` |

### :gear: createType

| Function | Type |
| ---------- | ---------- |
| `createType` | `(key: any) => command_request.Command` |

### :gear: createStrlen

| Function | Type |
| ---------- | ---------- |
| `createStrlen` | `(key: any) => command_request.Command` |

### :gear: createLIndex

| Function | Type |
| ---------- | ---------- |
| `createLIndex` | `(key: any, index: number) => command_request.Command` |

### :gear: createLInsert

| Function | Type |
| ---------- | ---------- |
| `createLInsert` | `(key: any, position: InsertPosition, pivot: any, element: any) => command_request.Command` |

### :gear: createZPopMin

| Function | Type |
| ---------- | ---------- |
| `createZPopMin` | `(key: any, count?: number or undefined) => command_request.Command` |

### :gear: createZPopMax

| Function | Type |
| ---------- | ---------- |
| `createZPopMax` | `(key: any, count?: number or undefined) => command_request.Command` |

### :gear: createEcho

| Function | Type |
| ---------- | ---------- |
| `createEcho` | `(message: any) => command_request.Command` |

### :gear: createPTTL

| Function | Type |
| ---------- | ---------- |
| `createPTTL` | `(key: any) => command_request.Command` |

### :gear: createZRemRangeByRank

| Function | Type |
| ---------- | ---------- |
| `createZRemRangeByRank` | `(key: any, start: number, end: number) => command_request.Command` |

### :gear: createZRemRangeByLex

| Function | Type |
| ---------- | ---------- |
| `createZRemRangeByLex` | `(key: any, minLex: Boundary<any>, maxLex: Boundary<any>) => command_request.Command` |

### :gear: createZRemRangeByScore

| Function | Type |
| ---------- | ---------- |
| `createZRemRangeByScore` | `(key: any, minScore: Boundary<number>, maxScore: Boundary<number>) => command_request.Command` |

### :gear: createPersist

| Function | Type |
| ---------- | ---------- |
| `createPersist` | `(key: any) => command_request.Command` |

### :gear: createZLexCount

| Function | Type |
| ---------- | ---------- |
| `createZLexCount` | `(key: any, minLex: Boundary<any>, maxLex: Boundary<any>) => command_request.Command` |

### :gear: createZRank

| Function | Type |
| ---------- | ---------- |
| `createZRank` | `(key: any, member: any, withScores?: boolean or undefined) => command_request.Command` |

### :gear: createXAdd

| Function | Type |
| ---------- | ---------- |
| `createXAdd` | `(key: any, values: [any, any][], options?: StreamAddOptions or undefined) => command_request.Command` |

### :gear: createXDel

| Function | Type |
| ---------- | ---------- |
| `createXDel` | `(key: any, ids: string[]) => command_request.Command` |

### :gear: createXTrim

| Function | Type |
| ---------- | ---------- |
| `createXTrim` | `(key: any, options: StreamTrimOptions) => command_request.Command` |

### :gear: createXRange

| Function | Type |
| ---------- | ---------- |
| `createXRange` | `(key: any, start: Boundary<string>, end: Boundary<string>, count?: number or undefined) => command_request.Command` |

### :gear: createXRevRange

| Function | Type |
| ---------- | ---------- |
| `createXRevRange` | `(key: any, start: Boundary<string>, end: Boundary<string>, count?: number or undefined) => command_request.Command` |

### :gear: createXGroupCreateConsumer

| Function | Type |
| ---------- | ---------- |
| `createXGroupCreateConsumer` | `(key: any, groupName: any, consumerName: any) => command_request.Command` |

### :gear: createXGroupDelConsumer

| Function | Type |
| ---------- | ---------- |
| `createXGroupDelConsumer` | `(key: any, groupName: any, consumerName: any) => command_request.Command` |

### :gear: createTime

| Function | Type |
| ---------- | ---------- |
| `createTime` | `() => command_request.Command` |

### :gear: createPublish

| Function | Type |
| ---------- | ---------- |
| `createPublish` | `(message: any, channel: any, sharded?: boolean) => command_request.Command` |

### :gear: createBRPop

| Function | Type |
| ---------- | ---------- |
| `createBRPop` | `(keys: any[], timeout: number) => command_request.Command` |

### :gear: createBLPop

| Function | Type |
| ---------- | ---------- |
| `createBLPop` | `(keys: any[], timeout: number) => command_request.Command` |

### :gear: createFCall

| Function | Type |
| ---------- | ---------- |
| `createFCall` | `(func: any, keys: any[], args: any[]) => command_request.Command` |

### :gear: createFCallReadOnly

| Function | Type |
| ---------- | ---------- |
| `createFCallReadOnly` | `(func: any, keys: any[], args: any[]) => command_request.Command` |

### :gear: createFunctionDelete

| Function | Type |
| ---------- | ---------- |
| `createFunctionDelete` | `(libraryCode: any) => command_request.Command` |

### :gear: createFunctionFlush

| Function | Type |
| ---------- | ---------- |
| `createFunctionFlush` | `(mode?: FlushMode or undefined) => command_request.Command` |

### :gear: createFunctionLoad

| Function | Type |
| ---------- | ---------- |
| `createFunctionLoad` | `(libraryCode: any, replace?: boolean or undefined) => command_request.Command` |

### :gear: createFunctionList

| Function | Type |
| ---------- | ---------- |
| `createFunctionList` | `(options?: FunctionListOptions or undefined) => command_request.Command` |

### :gear: createFunctionStats

| Function | Type |
| ---------- | ---------- |
| `createFunctionStats` | `() => command_request.Command` |

### :gear: createFunctionKill

| Function | Type |
| ---------- | ---------- |
| `createFunctionKill` | `() => command_request.Command` |

### :gear: createFunctionDump

| Function | Type |
| ---------- | ---------- |
| `createFunctionDump` | `() => command_request.Command` |

### :gear: createFunctionRestore

| Function | Type |
| ---------- | ---------- |
| `createFunctionRestore` | `(data: Buffer, policy?: FunctionRestorePolicy or undefined) => command_request.Command` |

### :gear: createBitCount

| Function | Type |
| ---------- | ---------- |
| `createBitCount` | `(key: any, options?: BitOffsetOptions or undefined) => command_request.Command` |

### :gear: createBitPos

| Function | Type |
| ---------- | ---------- |
| `createBitPos` | `(key: any, bit: number, options?: BitOffsetOptions or undefined) => command_request.Command` |

### :gear: convertKeysAndEntries

| Function | Type |
| ---------- | ---------- |
| `convertKeysAndEntries` | `(record: Record<string, string> or GlideRecord<string>) => GlideRecord<string>` |

Parameters:

* `record`: - input record in either Record or GlideRecord types.


### :gear: createXRead

| Function | Type |
| ---------- | ---------- |
| `createXRead` | `(keys_and_ids: GlideRecord<string>, options?: StreamReadOptions or undefined) => command_request.Command` |

### :gear: createXReadGroup

| Function | Type |
| ---------- | ---------- |
| `createXReadGroup` | `(group: any, consumer: any, keys_and_ids: GlideRecord<string>, options?: StreamReadGroupOptions or undefined) => command_request.Command` |

### :gear: createXInfoStream

| Function | Type |
| ---------- | ---------- |
| `createXInfoStream` | `(key: any, options: number or boolean) => command_request.Command` |

### :gear: createXInfoGroups

| Function | Type |
| ---------- | ---------- |
| `createXInfoGroups` | `(key: any) => command_request.Command` |

### :gear: createXLen

| Function | Type |
| ---------- | ---------- |
| `createXLen` | `(key: any) => command_request.Command` |

### :gear: createXPending

| Function | Type |
| ---------- | ---------- |
| `createXPending` | `(key: any, group: any, options?: StreamPendingOptions or undefined) => command_request.Command` |

### :gear: createXInfoConsumers

| Function | Type |
| ---------- | ---------- |
| `createXInfoConsumers` | `(key: any, group: any) => command_request.Command` |

### :gear: createXClaim

| Function | Type |
| ---------- | ---------- |
| `createXClaim` | `(key: any, group: any, consumer: any, minIdleTime: number, ids: string[], options?: StreamClaimOptions or undefined, justId?: boolean or undefined) => command_request.Command` |

### :gear: createXAutoClaim

| Function | Type |
| ---------- | ---------- |
| `createXAutoClaim` | `(key: any, group: any, consumer: any, minIdleTime: number, start: any, count?: number or undefined, justId?: boolean or undefined) => command_request.Command` |

### :gear: createXGroupCreate

| Function | Type |
| ---------- | ---------- |
| `createXGroupCreate` | `(key: any, groupName: any, id: string, options?: StreamGroupOptions or undefined) => command_request.Command` |

### :gear: createXGroupDestroy

| Function | Type |
| ---------- | ---------- |
| `createXGroupDestroy` | `(key: any, groupName: any) => command_request.Command` |

### :gear: createRename

| Function | Type |
| ---------- | ---------- |
| `createRename` | `(key: any, newKey: any) => command_request.Command` |

### :gear: createRenameNX

| Function | Type |
| ---------- | ---------- |
| `createRenameNX` | `(key: any, newKey: any) => command_request.Command` |

### :gear: createPfAdd

| Function | Type |
| ---------- | ---------- |
| `createPfAdd` | `(key: any, elements: any[]) => command_request.Command` |

### :gear: createPfCount

| Function | Type |
| ---------- | ---------- |
| `createPfCount` | `(keys: any[]) => command_request.Command` |

### :gear: createPfMerge

| Function | Type |
| ---------- | ---------- |
| `createPfMerge` | `(destination: any, sourceKey: any[]) => command_request.Command` |

### :gear: createObjectEncoding

| Function | Type |
| ---------- | ---------- |
| `createObjectEncoding` | `(key: any) => command_request.Command` |

### :gear: createObjectFreq

| Function | Type |
| ---------- | ---------- |
| `createObjectFreq` | `(key: any) => command_request.Command` |

### :gear: createObjectIdletime

| Function | Type |
| ---------- | ---------- |
| `createObjectIdletime` | `(key: any) => command_request.Command` |

### :gear: createObjectRefcount

| Function | Type |
| ---------- | ---------- |
| `createObjectRefcount` | `(key: any) => command_request.Command` |

### :gear: createLolwut

| Function | Type |
| ---------- | ---------- |
| `createLolwut` | `(options?: LolwutOptions or undefined) => command_request.Command` |

### :gear: createFlushAll

| Function | Type |
| ---------- | ---------- |
| `createFlushAll` | `(mode?: FlushMode or undefined) => command_request.Command` |

### :gear: createFlushDB

| Function | Type |
| ---------- | ---------- |
| `createFlushDB` | `(mode?: FlushMode or undefined) => command_request.Command` |

### :gear: createCopy

| Function | Type |
| ---------- | ---------- |
| `createCopy` | `(source: any, destination: any, options?: { destinationDB?: number or undefined; replace?: boolean or undefined; } or undefined) => command_request.Command` |

### :gear: createMove

| Function | Type |
| ---------- | ---------- |
| `createMove` | `(key: any, dbIndex: number) => command_request.Command` |

### :gear: createDump

| Function | Type |
| ---------- | ---------- |
| `createDump` | `(key: any) => command_request.Command` |

### :gear: createRestore

| Function | Type |
| ---------- | ---------- |
| `createRestore` | `(key: any, ttl: number, value: any, options?: RestoreOptions or undefined) => command_request.Command` |

### :gear: createLPos

| Function | Type |
| ---------- | ---------- |
| `createLPos` | `(key: any, element: any, options?: LPosOptions or undefined) => command_request.Command` |

### :gear: createDBSize

| Function | Type |
| ---------- | ---------- |
| `createDBSize` | `() => command_request.Command` |

### :gear: createGeoAdd

| Function | Type |
| ---------- | ---------- |
| `createGeoAdd` | `(key: any, membersToGeospatialData: Map<any, GeospatialData>, options?: GeoAddOptions or undefined) => command_request.Command` |

### :gear: createGeoPos

| Function | Type |
| ---------- | ---------- |
| `createGeoPos` | `(key: any, members: any[]) => command_request.Command` |

### :gear: createGeoDist

| Function | Type |
| ---------- | ---------- |
| `createGeoDist` | `(key: any, member1: any, member2: any, geoUnit?: GeoUnit or undefined) => command_request.Command` |

### :gear: createGeoHash

| Function | Type |
| ---------- | ---------- |
| `createGeoHash` | `(key: any, members: any[]) => command_request.Command` |

### :gear: createGeoSearch

| Function | Type |
| ---------- | ---------- |
| `createGeoSearch` | `(key: any, searchFrom: SearchOrigin, searchBy: GeoSearchShape, resultOptions?: GeoSearchResultOptions or undefined) => command_request.Command` |

### :gear: createGeoSearchStore

| Function | Type |
| ---------- | ---------- |
| `createGeoSearchStore` | `(destination: any, source: any, searchFrom: SearchOrigin, searchBy: GeoSearchShape, resultOptions?: GeoSearchStoreResultOptions or undefined) => command_request.Command` |

### :gear: createZRevRank

| Function | Type |
| ---------- | ---------- |
| `createZRevRank` | `(key: any, member: any) => command_request.Command` |

### :gear: createZRevRankWithScore

| Function | Type |
| ---------- | ---------- |
| `createZRevRankWithScore` | `(key: any, member: any) => command_request.Command` |

### :gear: createZMPop

| Function | Type |
| ---------- | ---------- |
| `createZMPop` | `(keys: any[], modifier: ScoreFilter, count?: number or undefined) => command_request.Command` |

### :gear: createBZMPop

| Function | Type |
| ---------- | ---------- |
| `createBZMPop` | `(keys: any[], modifier: ScoreFilter, timeout: number, count?: number or undefined) => command_request.Command` |

### :gear: createZIncrBy

| Function | Type |
| ---------- | ---------- |
| `createZIncrBy` | `(key: any, increment: number, member: any) => command_request.Command` |

### :gear: createSort

| Function | Type |
| ---------- | ---------- |
| `createSort` | `(key: any, options?: SortOptions or undefined, destination?: any) => command_request.Command` |

### :gear: createSortReadOnly

| Function | Type |
| ---------- | ---------- |
| `createSortReadOnly` | `(key: any, options?: SortOptions or undefined) => command_request.Command` |

### :gear: createHStrlen

| Function | Type |
| ---------- | ---------- |
| `createHStrlen` | `(key: any, field: any) => command_request.Command` |

### :gear: createHRandField

| Function | Type |
| ---------- | ---------- |
| `createHRandField` | `(key: any, count?: number or undefined, withValues?: boolean or undefined) => command_request.Command` |

### :gear: createHScan

| Function | Type |
| ---------- | ---------- |
| `createHScan` | `(key: any, cursor: string, options?: HScanOptions or undefined) => command_request.Command` |

### :gear: createZRandMember

| Function | Type |
| ---------- | ---------- |
| `createZRandMember` | `(key: any, count?: number or undefined, withscores?: boolean or undefined) => command_request.Command` |

### :gear: createLastSave

| Function | Type |
| ---------- | ---------- |
| `createLastSave` | `() => command_request.Command` |

### :gear: createLCS

| Function | Type |
| ---------- | ---------- |
| `createLCS` | `(key1: any, key2: any, options?: { len?: boolean or undefined; idx?: { withMatchLen?: boolean or undefined; minMatchLen?: number or undefined; } or undefined; } or undefined) => command_request.Command` |

### :gear: createTouch

| Function | Type |
| ---------- | ---------- |
| `createTouch` | `(keys: any[]) => command_request.Command` |

### :gear: createRandomKey

| Function | Type |
| ---------- | ---------- |
| `createRandomKey` | `() => command_request.Command` |

### :gear: createWatch

| Function | Type |
| ---------- | ---------- |
| `createWatch` | `(keys: any[]) => command_request.Command` |

### :gear: createUnWatch

| Function | Type |
| ---------- | ---------- |
| `createUnWatch` | `() => command_request.Command` |

### :gear: createWait

| Function | Type |
| ---------- | ---------- |
| `createWait` | `(numreplicas: number, timeout: number) => command_request.Command` |

### :gear: createZScan

| Function | Type |
| ---------- | ---------- |
| `createZScan` | `(key: any, cursor: string, options?: ZScanOptions or undefined) => command_request.Command` |

### :gear: createSetRange

| Function | Type |
| ---------- | ---------- |
| `createSetRange` | `(key: any, offset: number, value: any) => command_request.Command` |

### :gear: createAppend

| Function | Type |
| ---------- | ---------- |
| `createAppend` | `(key: any, value: any) => command_request.Command` |

### :gear: createLMPop

| Function | Type |
| ---------- | ---------- |
| `createLMPop` | `(keys: any[], direction: ListDirection, count?: number or undefined) => command_request.Command` |

### :gear: createBLMPop

| Function | Type |
| ---------- | ---------- |
| `createBLMPop` | `(keys: any[], direction: ListDirection, timeout: number, count?: number or undefined) => command_request.Command` |

### :gear: createPubSubChannels

| Function | Type |
| ---------- | ---------- |
| `createPubSubChannels` | `(pattern?: any) => command_request.Command` |

### :gear: createPubSubNumPat

| Function | Type |
| ---------- | ---------- |
| `createPubSubNumPat` | `() => command_request.Command` |

### :gear: createPubSubNumSub

| Function | Type |
| ---------- | ---------- |
| `createPubSubNumSub` | `(channels?: any[] or undefined) => command_request.Command` |

### :gear: createPubsubShardChannels

| Function | Type |
| ---------- | ---------- |
| `createPubsubShardChannels` | `(pattern?: any) => command_request.Command` |

### :gear: createPubSubShardNumSub

| Function | Type |
| ---------- | ---------- |
| `createPubSubShardNumSub` | `(channels?: any[] or undefined) => command_request.Command` |

### :gear: createBZPopMax

| Function | Type |
| ---------- | ---------- |
| `createBZPopMax` | `(keys: any[], timeout: number) => command_request.Command` |

### :gear: createBZPopMin

| Function | Type |
| ---------- | ---------- |
| `createBZPopMin` | `(keys: any[], timeout: number) => command_request.Command` |

### :gear: createScriptShow

| Function | Type |
| ---------- | ---------- |
| `createScriptShow` | `(sha1: any) => command_request.Command` |

### :gear: createGetEx

| Function | Type |
| ---------- | ---------- |
| `createGetEx` | `(key: any, options?: "persist" or { type: TimeUnit; duration: number; } or undefined) => command_request.Command` |

### :gear: createXAck

| Function | Type |
| ---------- | ---------- |
| `createXAck` | `(key: any, group: any, ids: string[]) => command_request.Command` |

### :gear: createXGroupSetid

| Function | Type |
| ---------- | ---------- |
| `createXGroupSetid` | `(key: any, groupName: any, id: string, entriesRead?: number or undefined) => command_request.Command` |

### :gear: createScriptExists

| Function | Type |
| ---------- | ---------- |
| `createScriptExists` | `(sha1s: any[]) => command_request.Command` |

### :gear: createScriptFlush

| Function | Type |
| ---------- | ---------- |
| `createScriptFlush` | `(mode?: FlushMode or undefined) => command_request.Command` |

### :gear: createScriptKill

| Function | Type |
| ---------- | ---------- |
| `createScriptKill` | `() => command_request.Command` |

### :gear: convertGlideRecord

| Function | Type |
| ---------- | ---------- |
| `convertGlideRecord` | `(keysAndValues: Record<string, any> or GlideRecord<any>) => GlideRecord<any>` |

Parameters:

* `keysAndValues`: - key names and their values.


### :gear: convertGlideRecordToRecord

| Function | Type |
| ---------- | ---------- |
| `convertGlideRecordToRecord` | `<T>(data: GlideRecord<T>) => Record<string, T>` |

### :gear: isGlideRecord

| Function | Type |
| ---------- | ---------- |
| `isGlideRecord` | `(obj?: unknown) => boolean` |

### :gear: convertRecordToGlideRecord

| Function | Type |
| ---------- | ---------- |
| `convertRecordToGlideRecord` | `<T>(data: Record<string, T>) => GlideRecord<T>` |


## :wrench: Constants

- [TIMEOUT_ERROR](#gear-timeout_error)

### :gear: TIMEOUT_ERROR

| Constant | Type |
| ---------- | ---------- |
| `TIMEOUT_ERROR` | `TimeoutError` |


## :factory: BaseTransaction

Base class encompassing shared commands for both standalone and cluster mode implementations in a transaction.
Transactions allow the execution of a group of commands in a single step.

Command Response:
 An array of command responses is returned by the client exec command, in the order they were given.
 Each element in the array represents a command given to the transaction.
 The response for each command depends on the executed Valkey command.
 Specific response types are documented alongside each method.

### Methods

- [get](#gear-get)
- [getex](#gear-getex)
- [getdel](#gear-getdel)
- [getrange](#gear-getrange)
- [set](#gear-set)
- [ping](#gear-ping)
- [info](#gear-info)
- [del](#gear-del)
- [dump](#gear-dump)
- [restore](#gear-restore)
- [clientGetName](#gear-clientgetname)
- [configRewrite](#gear-configrewrite)
- [configResetStat](#gear-configresetstat)
- [mget](#gear-mget)
- [mset](#gear-mset)
- [msetnx](#gear-msetnx)
- [incr](#gear-incr)
- [incrBy](#gear-incrby)
- [incrByFloat](#gear-incrbyfloat)
- [clientId](#gear-clientid)
- [decr](#gear-decr)
- [decrBy](#gear-decrby)
- [bitop](#gear-bitop)
- [getbit](#gear-getbit)
- [setbit](#gear-setbit)
- [bitpos](#gear-bitpos)
- [bitfield](#gear-bitfield)
- [bitfieldReadOnly](#gear-bitfieldreadonly)
- [configGet](#gear-configget)
- [configSet](#gear-configset)
- [hget](#gear-hget)
- [hset](#gear-hset)
- [hkeys](#gear-hkeys)
- [hsetnx](#gear-hsetnx)
- [hdel](#gear-hdel)
- [hmget](#gear-hmget)
- [hexists](#gear-hexists)
- [hgetall](#gear-hgetall)
- [hincrBy](#gear-hincrby)
- [hincrByFloat](#gear-hincrbyfloat)
- [hlen](#gear-hlen)
- [hvals](#gear-hvals)
- [hstrlen](#gear-hstrlen)
- [hrandfield](#gear-hrandfield)
- [hscan](#gear-hscan)
- [hrandfieldCount](#gear-hrandfieldcount)
- [hrandfieldWithValues](#gear-hrandfieldwithvalues)
- [lpush](#gear-lpush)
- [lpushx](#gear-lpushx)
- [lpop](#gear-lpop)
- [lpopCount](#gear-lpopcount)
- [lrange](#gear-lrange)
- [llen](#gear-llen)
- [lmove](#gear-lmove)
- [blmove](#gear-blmove)
- [lset](#gear-lset)
- [ltrim](#gear-ltrim)
- [lrem](#gear-lrem)
- [rpush](#gear-rpush)
- [rpushx](#gear-rpushx)
- [rpop](#gear-rpop)
- [rpopCount](#gear-rpopcount)
- [sadd](#gear-sadd)
- [srem](#gear-srem)
- [sscan](#gear-sscan)
- [smembers](#gear-smembers)
- [smove](#gear-smove)
- [scard](#gear-scard)
- [sinter](#gear-sinter)
- [sintercard](#gear-sintercard)
- [sinterstore](#gear-sinterstore)
- [sdiff](#gear-sdiff)
- [sdiffstore](#gear-sdiffstore)
- [sunion](#gear-sunion)
- [sunionstore](#gear-sunionstore)
- [sismember](#gear-sismember)
- [smismember](#gear-smismember)
- [spop](#gear-spop)
- [spopCount](#gear-spopcount)
- [srandmember](#gear-srandmember)
- [srandmemberCount](#gear-srandmembercount)
- [exists](#gear-exists)
- [unlink](#gear-unlink)
- [expire](#gear-expire)
- [expireAt](#gear-expireat)
- [expireTime](#gear-expiretime)
- [pexpire](#gear-pexpire)
- [pexpireAt](#gear-pexpireat)
- [pexpireTime](#gear-pexpiretime)
- [ttl](#gear-ttl)
- [zadd](#gear-zadd)
- [zaddIncr](#gear-zaddincr)
- [zrem](#gear-zrem)
- [zcard](#gear-zcard)
- [zintercard](#gear-zintercard)
- [zdiff](#gear-zdiff)
- [zdiffWithScores](#gear-zdiffwithscores)
- [zdiffstore](#gear-zdiffstore)
- [zscore](#gear-zscore)
- [zunionstore](#gear-zunionstore)
- [zmscore](#gear-zmscore)
- [zcount](#gear-zcount)
- [zrange](#gear-zrange)
- [zrangeWithScores](#gear-zrangewithscores)
- [zrangeStore](#gear-zrangestore)
- [zinterstore](#gear-zinterstore)
- [zinter](#gear-zinter)
- [zinterWithScores](#gear-zinterwithscores)
- [zunion](#gear-zunion)
- [zunionWithScores](#gear-zunionwithscores)
- [zrandmember](#gear-zrandmember)
- [zrandmemberWithCount](#gear-zrandmemberwithcount)
- [zrandmemberWithCountWithScores](#gear-zrandmemberwithcountwithscores)
- [type](#gear-type)
- [strlen](#gear-strlen)
- [zpopmin](#gear-zpopmin)
- [bzpopmin](#gear-bzpopmin)
- [zpopmax](#gear-zpopmax)
- [bzpopmax](#gear-bzpopmax)
- [echo](#gear-echo)
- [pttl](#gear-pttl)
- [zremRangeByRank](#gear-zremrangebyrank)
- [zremRangeByLex](#gear-zremrangebylex)
- [zremRangeByScore](#gear-zremrangebyscore)
- [zlexcount](#gear-zlexcount)
- [zrank](#gear-zrank)
- [zrankWithScore](#gear-zrankwithscore)
- [zrevrank](#gear-zrevrank)
- [zrevrankWithScore](#gear-zrevrankwithscore)
- [persist](#gear-persist)
- [customCommand](#gear-customcommand)
- [lindex](#gear-lindex)
- [linsert](#gear-linsert)
- [xadd](#gear-xadd)
- [xdel](#gear-xdel)
- [xtrim](#gear-xtrim)
- [xinfoStream](#gear-xinfostream)
- [xinfoGroups](#gear-xinfogroups)
- [time](#gear-time)
- [xrange](#gear-xrange)
- [xrevrange](#gear-xrevrange)
- [xread](#gear-xread)
- [xreadgroup](#gear-xreadgroup)
- [xlen](#gear-xlen)
- [xpending](#gear-xpending)
- [xpendingWithOptions](#gear-xpendingwithoptions)
- [xinfoConsumers](#gear-xinfoconsumers)
- [xclaim](#gear-xclaim)
- [xclaimJustId](#gear-xclaimjustid)
- [xautoclaim](#gear-xautoclaim)
- [xautoclaimJustId](#gear-xautoclaimjustid)
- [xgroupCreate](#gear-xgroupcreate)
- [xgroupDestroy](#gear-xgroupdestroy)
- [xgroupCreateConsumer](#gear-xgroupcreateconsumer)
- [xgroupDelConsumer](#gear-xgroupdelconsumer)
- [xack](#gear-xack)
- [xgroupSetId](#gear-xgroupsetid)
- [rename](#gear-rename)
- [renamenx](#gear-renamenx)
- [brpop](#gear-brpop)
- [blpop](#gear-blpop)
- [pfadd](#gear-pfadd)
- [pfcount](#gear-pfcount)
- [pfmerge](#gear-pfmerge)
- [objectEncoding](#gear-objectencoding)
- [objectFreq](#gear-objectfreq)
- [objectIdletime](#gear-objectidletime)
- [objectRefcount](#gear-objectrefcount)
- [lolwut](#gear-lolwut)
- [wait](#gear-wait)
- [fcall](#gear-fcall)
- [fcallReadonly](#gear-fcallreadonly)
- [functionDelete](#gear-functiondelete)
- [functionLoad](#gear-functionload)
- [functionFlush](#gear-functionflush)
- [functionList](#gear-functionlist)
- [functionStats](#gear-functionstats)
- [functionDump](#gear-functiondump)
- [functionRestore](#gear-functionrestore)
- [flushall](#gear-flushall)
- [flushdb](#gear-flushdb)
- [lpos](#gear-lpos)
- [dbsize](#gear-dbsize)
- [bitcount](#gear-bitcount)
- [geoadd](#gear-geoadd)
- [geosearch](#gear-geosearch)
- [geosearchstore](#gear-geosearchstore)
- [geopos](#gear-geopos)
- [zmpop](#gear-zmpop)
- [bzmpop](#gear-bzmpop)
- [zincrby](#gear-zincrby)
- [zscan](#gear-zscan)
- [geodist](#gear-geodist)
- [geohash](#gear-geohash)
- [lastsave](#gear-lastsave)
- [lcs](#gear-lcs)
- [lcsLen](#gear-lcslen)
- [lcsIdx](#gear-lcsidx)
- [touch](#gear-touch)
- [randomKey](#gear-randomkey)
- [setrange](#gear-setrange)
- [append](#gear-append)
- [lmpop](#gear-lmpop)
- [blmpop](#gear-blmpop)
- [pubsubChannels](#gear-pubsubchannels)
- [pubsubNumPat](#gear-pubsubnumpat)
- [pubsubNumSub](#gear-pubsubnumsub)
- [sort](#gear-sort)
- [sortReadOnly](#gear-sortreadonly)
- [sortStore](#gear-sortstore)

#### :gear: get

Get the value associated with the given key, or null if no such value exists.

| Method | Type |
| ---------- | ---------- |
| `get` | `(key: any) => T` |

Parameters:

* `key`: - The key to retrieve from the database.

Command Response - If `key` exists, returns the value of `key`. Otherwise, return null.


#### :gear: getex

Get the value of `key` and optionally set its expiration. `GETEX` is similar to {@link get}.

| Method | Type |
| ---------- | ---------- |
| `getex` | `(key: any, options?: "persist" or { type: TimeUnit; duration: number; } or undefined) => T` |

Parameters:

* `key`: - The key to retrieve from the database.
* `options`: - (Optional) set expiriation to the given key.
  "persist" will retain the time to live associated with the key. Equivalent to `PERSIST` in the VALKEY API.
  Otherwise, a 


#### :gear: getdel

Gets a string value associated with the given `key`and deletes the key.

| Method | Type |
| ---------- | ---------- |
| `getdel` | `(key: any) => T` |

Parameters:

* `key`: - The key to retrieve from the database.

Command Response - If `key` exists, returns the `value` of `key`. Otherwise, return `null`.


#### :gear: getrange

Returns the substring of the string value stored at `key`, determined by the byte offsets
`start` and `end` (both are inclusive). Negative offsets can be used in order to provide
an offset starting from the end of the string. So `-1` means the last character, `-2` the
penultimate and so forth. If `key` does not exist, an empty string is returned. If `start`
or `end` are out of range, returns the substring within the valid range of the string.

| Method | Type |
| ---------- | ---------- |
| `getrange` | `(key: any, start: number, end: number) => T` |

Parameters:

* `key`: - The key of the string.
* `start`: - The starting byte offset.
* `end`: - The ending byte offset.

Command Response - substring extracted from the value stored at `key`.


#### :gear: set

Set the given key with the given value. Return value is dependent on the passed options.

| Method | Type |
| ---------- | ---------- |
| `set` | `(key: any, value: any, options?: SetOptions or undefined) => T` |

Parameters:

* `key`: - The key to store.
* `value`: - The value to store with the given key.
* `options`: - The set options.

Command Response - If the value is successfully set, return OK.
If `value` isn't set because of `onlyIfExists` or `onlyIfDoesNotExist` conditions, return null.
If `returnOldValue` is set, return the old value as a string.


#### :gear: ping

Pings the server.

| Method | Type |
| ---------- | ---------- |
| `ping` | `(message?: any) => T` |

Parameters:

* `message`: - (Optional) A message to include in the PING command.
- If not provided, the server will respond with `"PONG"`.
- If provided, the server will respond with a copy of the message.

Command Response - `"PONG"` if `message` is not provided, otherwise return a copy of `message`.


#### :gear: info

Gets information and statistics about the server.

| Method | Type |
| ---------- | ---------- |
| `info` | `(sections?: InfoOptions[] or undefined) => T` |

Parameters:

* `sections`: - (Optional) A list of 


#### :gear: del

Removes the specified keys. A key is ignored if it does not exist.

| Method | Type |
| ---------- | ---------- |
| `del` | `(keys: any[]) => T` |

Parameters:

* `keys`: - A list of keys to be deleted from the database.

Command Response - The number of keys that were removed.


#### :gear: dump

Serialize the value stored at `key` in a Valkey-specific format and return it to the user.

| Method | Type |
| ---------- | ---------- |
| `dump` | `(key: any) => T` |

Parameters:

* `key`: - The `key` to serialize.

Command Response - The serialized value of the data stored at `key`. If `key` does not exist, `null` will be returned.


#### :gear: restore

Create a `key` associated with a `value` that is obtained by deserializing the provided
serialized `value` (obtained via {@link dump}).

| Method | Type |
| ---------- | ---------- |
| `restore` | `(key: any, ttl: number, value: Buffer, options?: RestoreOptions or undefined) => T` |

Parameters:

* `key`: - The `key` to create.
* `ttl`: - The expiry time (in milliseconds). If `0`, the `key` will persist.
* `value`: - The serialized value to deserialize and assign to `key`.
* `options`: - (Optional) Restore options 


#### :gear: clientGetName

Gets the name of the connection on which the transaction is being executed.

| Method | Type |
| ---------- | ---------- |
| `clientGetName` | `() => T` |

#### :gear: configRewrite

Rewrites the configuration file with the current configuration.

| Method | Type |
| ---------- | ---------- |
| `configRewrite` | `() => T` |

#### :gear: configResetStat

Resets the statistics reported by Valkey using the `INFO` and `LATENCY HISTOGRAM` commands.

| Method | Type |
| ---------- | ---------- |
| `configResetStat` | `() => T` |

#### :gear: mget

Retrieve the values of multiple keys.

| Method | Type |
| ---------- | ---------- |
| `mget` | `(keys: any[]) => T` |

Parameters:

* `keys`: - A list of keys to retrieve values for.

Command Response - A list of values corresponding to the provided keys. If a key is not found,
its corresponding value in the list will be null.


#### :gear: mset

Set multiple keys to multiple values in a single atomic operation.

| Method | Type |
| ---------- | ---------- |
| `mset` | `(keysAndValues: Record<string, any> or GlideRecord<any>) => T` |

Parameters:

* `keysAndValues`: - A list of key-value pairs to set.

Command Response - always "OK".


#### :gear: msetnx

Sets multiple keys to values if the key does not exist. The operation is atomic, and if one or
more keys already exist, the entire operation fails.

| Method | Type |
| ---------- | ---------- |
| `msetnx` | `(keysAndValues: Record<string, any> or GlideRecord<any>) => T` |

Parameters:

* `keysAndValues`: - A list of key-value pairs to set.
Command Response - `true` if all keys were set. `false` if no key was set.


#### :gear: incr

Increments the number stored at `key` by one. If `key` does not exist, it is set to 0 before performing the operation.

| Method | Type |
| ---------- | ---------- |
| `incr` | `(key: any) => T` |

Parameters:

* `key`: - The key to increment its value.

Command Response - the value of `key` after the increment.


#### :gear: incrBy

Increments the number stored at `key` by `amount`. If `key` does not exist, it is set to 0 before performing the operation.

| Method | Type |
| ---------- | ---------- |
| `incrBy` | `(key: any, amount: number) => T` |

Parameters:

* `key`: - The key to increment its value.
* `amount`: - The amount to increment.

Command Response - the value of `key` after the increment.


#### :gear: incrByFloat

Increment the string representing a floating point number stored at `key` by `amount`.
By using a negative amount value, the result is that the value stored at `key` is decremented.
If `key` does not exist, it is set to 0 before performing the operation.

| Method | Type |
| ---------- | ---------- |
| `incrByFloat` | `(key: any, amount: number) => T` |

Parameters:

* `key`: - The key to increment its value.
* `amount`: - The amount to increment.

Command Response - the value of `key` after the increment.


#### :gear: clientId

Returns the current connection ID.

| Method | Type |
| ---------- | ---------- |
| `clientId` | `() => T` |

#### :gear: decr

Decrements the number stored at `key` by one. If `key` does not exist, it is set to 0 before performing the operation.

| Method | Type |
| ---------- | ---------- |
| `decr` | `(key: any) => T` |

Parameters:

* `key`: - The key to decrement its value.

Command Response - the value of `key` after the decrement.


#### :gear: decrBy

Decrements the number stored at `key` by `amount`. If `key` does not exist, it is set to 0 before performing the operation.

| Method | Type |
| ---------- | ---------- |
| `decrBy` | `(key: any, amount: number) => T` |

Parameters:

* `key`: - The key to decrement its value.
* `amount`: - The amount to decrement.

Command Response - the value of `key` after the decrement.


#### :gear: bitop

Perform a bitwise operation between multiple keys (containing string values) and store the result in the
`destination`.

| Method | Type |
| ---------- | ---------- |
| `bitop` | `(operation: BitwiseOperation, destination: any, keys: any[]) => T` |

Parameters:

* `operation`: - The bitwise operation to perform.
* `destination`: - The key that will store the resulting string.
* `keys`: - The list of keys to perform the bitwise operation on.

Command Response - The size of the string stored in `destination`.


#### :gear: getbit

Returns the bit value at `offset` in the string value stored at `key`. `offset` must be greater than or equal
to zero.

| Method | Type |
| ---------- | ---------- |
| `getbit` | `(key: any, offset: number) => T` |

Parameters:

* `key`: - The key of the string.
* `offset`: - The index of the bit to return.

Command Response - The bit at the given `offset` of the string. Returns `0` if the key is empty or if the
`offset` exceeds the length of the string.


#### :gear: setbit

Sets or clears the bit at `offset` in the string value stored at `key`. The `offset` is a zero-based index, with
`0` being the first element of the list, `1` being the next element, and so on. The `offset` must be less than
`2^32` and greater than or equal to `0`. If a key is non-existent then the bit at `offset` is set to `value` and
the preceding bits are set to `0`.

| Method | Type |
| ---------- | ---------- |
| `setbit` | `(key: any, offset: number, value: number) => T` |

Parameters:

* `key`: - The key of the string.
* `offset`: - The index of the bit to be set.
* `value`: - The bit value to set at `offset`. The value must be `0` or `1`.

Command Response - The bit value that was previously stored at `offset`.


#### :gear: bitpos

Returns the position of the first bit matching the given `bit` value. The optional starting offset
`start` is a zero-based index, with `0` being the first byte of the list, `1` being the next byte and so on.
The offset can also be a negative number indicating an offset starting at the end of the list, with `-1` being
the last byte of the list, `-2` being the penultimate, and so on.

| Method | Type |
| ---------- | ---------- |
| `bitpos` | `(key: any, bit: number, options?: BitOffsetOptions or undefined) => T` |

Parameters:

* `key`: - The key of the string.
* `bit`: - The bit value to match. Must be `0` or `1`.
* `options`: - (Optional) The 


#### :gear: bitfield

Reads or modifies the array of bits representing the string that is held at `key` based on the specified
`subcommands`.

| Method | Type |
| ---------- | ---------- |
| `bitfield` | `(key: any, subcommands: BitFieldSubCommands[]) => T` |

Parameters:

* `key`: - The key of the string.
* `subcommands`: - The subcommands to be performed on the binary value of the string at `key`, which could be
any of the following:

- 


#### :gear: bitfieldReadOnly

Reads the array of bits representing the string that is held at `key` based on the specified `subcommands`.

| Method | Type |
| ---------- | ---------- |
| `bitfieldReadOnly` | `(key: any, subcommands: BitFieldGet[]) => T` |

Parameters:

* `key`: - The key of the string.
* `subcommands`: - The 


#### :gear: configGet

Reads the configuration parameters of the running server.

| Method | Type |
| ---------- | ---------- |
| `configGet` | `(parameters: string[]) => T` |

Parameters:

* `parameters`: - A list of configuration parameter names to retrieve values for.

Command Response - A map of values corresponding to the configuration parameters.


#### :gear: configSet

Sets configuration parameters to the specified values.

| Method | Type |
| ---------- | ---------- |
| `configSet` | `(parameters: Record<string, any>) => T` |

Parameters:

* `parameters`: - A map consisting of configuration parameters and their respective values to set.

Command Response - "OK" when the configuration was set properly. Otherwise, the transaction fails with an error.


#### :gear: hget

Retrieve the value associated with `field` in the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hget` | `(key: any, field: any) => T` |

Parameters:

* `key`: - The key of the hash.
* `field`: - The field in the hash stored at `key` to retrieve from the database.

Command Response - the value associated with `field`, or null when `field` is not present in the hash or `key` does not exist.


#### :gear: hset

Sets the specified fields to their respective values in the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hset` | `(key: any, fieldsAndValues: Record<string, any> or HashDataType) => T` |

Parameters:

* `key`: - The key of the hash.
* `fieldValueList`: - A list of field names and their values.
to be set in the hash stored at the specified key.

Command Response - The number of fields that were added.


#### :gear: hkeys

Returns all field names in the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hkeys` | `(key: any) => T` |

Parameters:

* `key`: - The key of the hash.

Command Response - A list of field names for the hash, or an empty list when the key does not exist.


#### :gear: hsetnx

Sets `field` in the hash stored at `key` to `value`, only if `field` does not yet exist.
If `key` does not exist, a new key holding a hash is created.
If `field` already exists, this operation has no effect.

| Method | Type |
| ---------- | ---------- |
| `hsetnx` | `(key: any, field: any, value: any) => T` |

Parameters:

* `key`: - The key of the hash.
* `field`: - The field to set the value for.
* `value`: - The value to set.

Command Response - `true` if the field was set, `false` if the field already existed and was not set.


#### :gear: hdel

Removes the specified fields from the hash stored at `key`.
Specified fields that do not exist within this hash are ignored.

| Method | Type |
| ---------- | ---------- |
| `hdel` | `(key: any, fields: any[]) => T` |

Parameters:

* `key`: - The key of the hash.
* `fields`: - The fields to remove from the hash stored at `key`.

Command Response - the number of fields that were removed from the hash, not including specified but non existing fields.
If `key` does not exist, it is treated as an empty hash and it returns 0.


#### :gear: hmget

Returns the values associated with the specified fields in the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hmget` | `(key: any, fields: any[]) => T` |

Parameters:

* `key`: - The key of the hash.
* `fields`: - The fields in the hash stored at `key` to retrieve from the database.

Command Response - a list of values associated with the given fields, in the same order as they are requested.
For every field that does not exist in the hash, a null value is returned.
If `key` does not exist, it is treated as an empty hash and it returns a list of null values.


#### :gear: hexists

Returns if `field` is an existing field in the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hexists` | `(key: any, field: any) => T` |

Parameters:

* `key`: - The key of the hash.
* `field`: - The field to check in the hash stored at `key`.

Command Response - `true` if the hash contains `field`. If the hash does not contain `field`, or if `key` does not exist,
the command response will be `false`.


#### :gear: hgetall

Returns all fields and values of the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hgetall` | `(key: any) => T` |

Parameters:

* `key`: - The key of the hash.

Command Response - A list of fields and their values stored in the hash.
If `key` does not exist, it returns an empty list.


#### :gear: hincrBy

Increments the number stored at `field` in the hash stored at `key` by `increment`.
By using a negative increment value, the value stored at `field` in the hash stored at `key` is decremented.
If `field` or `key` does not exist, it is set to 0 before performing the operation.

| Method | Type |
| ---------- | ---------- |
| `hincrBy` | `(key: any, field: any, amount: number) => T` |

Parameters:

* `key`: - The key of the hash.
* `amount`: - The amount to increment.
* `field`: - The field in the hash stored at `key` to increment its value.

Command Response - the value of `field` in the hash stored at `key` after the increment.


#### :gear: hincrByFloat

Increment the string representing a floating point number stored at `field` in the hash stored at `key` by `increment`.
By using a negative increment value, the value stored at `field` in the hash stored at `key` is decremented.
If `field` or `key` does not exist, it is set to 0 before performing the operation.

| Method | Type |
| ---------- | ---------- |
| `hincrByFloat` | `(key: any, field: any, amount: number) => T` |

Parameters:

* `key`: - The key of the hash.
* `amount`: - The amount to increment.
* `field`: - The field in the hash stored at `key` to increment its value.

Command Response - the value of `field` in the hash stored at `key` after the increment.


#### :gear: hlen

Returns the number of fields contained in the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hlen` | `(key: any) => T` |

Parameters:

* `key`: - The key of the hash.

Command Response - The number of fields in the hash, or 0 when the key does not exist.


#### :gear: hvals

Returns all values in the hash stored at key.

| Method | Type |
| ---------- | ---------- |
| `hvals` | `(key: any) => T` |

Parameters:

* `key`: - The key of the hash.

Command Response - a list of values in the hash, or an empty list when the key does not exist.


#### :gear: hstrlen

Returns the string length of the value associated with `field` in the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hstrlen` | `(key: any, field: any) => T` |

Parameters:

* `key`: - The key of the hash.
* `field`: - The field in the hash.

Command Response - The string length or `0` if `field` or `key` does not exist.


#### :gear: hrandfield

Returns a random field name from the hash value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hrandfield` | `(key: any) => T` |

Parameters:

* `key`: - The key of the hash.

Command Response - A random field name from the hash stored at `key`, or `null` when
the key does not exist.


#### :gear: hscan

Iterates incrementally over a hash.

| Method | Type |
| ---------- | ---------- |
| `hscan` | `(key: any, cursor: string, options?: HScanOptions or undefined) => T` |

Parameters:

* `key`: - The key of the set.
* `cursor`: - The cursor that points to the next iteration of results. A value of `"0"` indicates the start of the search.
* `options`: - (Optional) The 


#### :gear: hrandfieldCount

Retrieves up to `count` random field names from the hash value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hrandfieldCount` | `(key: any, count: number) => T` |

Parameters:

* `key`: - The key of the hash.
* `count`: - The number of field names to return.

If `count` is positive, returns unique elements. If negative, allows for duplicates.

Command Response - An `array` of random field names from the hash stored at `key`,
or an `empty array` when the key does not exist.


#### :gear: hrandfieldWithValues

Retrieves up to `count` random field names along with their values from the hash
value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hrandfieldWithValues` | `(key: any, count: number) => T` |

Parameters:

* `key`: - The key of the hash.
* `count`: - The number of field names to return.

If `count` is positive, returns unique elements. If negative, allows for duplicates.

Command Response - A 2D `array` of `[fieldName, value]` `arrays`, where `fieldName` is a random
field name from the hash and `value` is the associated value of the field name.
If the hash does not exist or is empty, the response will be an empty `array`.


#### :gear: lpush

Inserts all the specified values at the head of the list stored at `key`.
`elements` are inserted one after the other to the head of the list, from the leftmost element to the rightmost element.
If `key` does not exist, it is created as empty list before performing the push operations.

| Method | Type |
| ---------- | ---------- |
| `lpush` | `(key: any, elements: any[]) => T` |

Parameters:

* `key`: - The key of the list.
* `elements`: - The elements to insert at the head of the list stored at `key`.

Command Response - the length of the list after the push operations.


#### :gear: lpushx

Inserts specified values at the head of the `list`, only if `key` already
exists and holds a list.

| Method | Type |
| ---------- | ---------- |
| `lpushx` | `(key: any, elements: any[]) => T` |

Parameters:

* `key`: - The key of the list.
* `elements`: - The elements to insert at the head of the list stored at `key`.

Command Response - The length of the list after the push operation.


#### :gear: lpop

Removes and returns the first elements of the list stored at `key`.
The command pops a single element from the beginning of the list.

| Method | Type |
| ---------- | ---------- |
| `lpop` | `(key: any) => T` |

Parameters:

* `key`: - The key of the list.

Command Response - The value of the first element.
If `key` does not exist null will be returned.


#### :gear: lpopCount

Removes and returns up to `count` elements of the list stored at `key`, depending on the list's length.

| Method | Type |
| ---------- | ---------- |
| `lpopCount` | `(key: any, count: number) => T` |

Parameters:

* `key`: - The key of the list.
* `count`: - The count of the elements to pop from the list.

Command Response - A list of the popped elements will be returned depending on the list's length.
If `key` does not exist null will be returned.


#### :gear: lrange

Returns the specified elements of the list stored at `key`.
The offsets `start` and `end` are zero-based indexes, with 0 being the first element of the list, 1 being the next element and so on.
These offsets can also be negative numbers indicating offsets starting at the end of the list,
with -1 being the last element of the list, -2 being the penultimate, and so on.

| Method | Type |
| ---------- | ---------- |
| `lrange` | `(key: any, start: number, end: number) => T` |

Parameters:

* `key`: - The key of the list.
* `start`: - The starting point of the range.
* `end`: - The end of the range.

Command Response - list of elements in the specified range.
If `start` exceeds the end of the list, or if `start` is greater than `end`, an empty list will be returned.
If `end` exceeds the actual end of the list, the range will stop at the actual end of the list.
If `key` does not exist an empty list will be returned.


#### :gear: llen

Returns the length of the list stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `llen` | `(key: any) => T` |

Parameters:

* `key`: - The key of the list.

Command Response - the length of the list at `key`.
If `key` does not exist, it is interpreted as an empty list and 0 is returned.


#### :gear: lmove

Atomically pops and removes the left/right-most element to the list stored at `source`
depending on `whereFrom`, and pushes the element at the first/last element of the list
stored at `destination` depending on `whereTo`, see {@link ListDirection}.

| Method | Type |
| ---------- | ---------- |
| `lmove` | `(source: any, destination: any, whereFrom: ListDirection, whereTo: ListDirection) => T` |

Parameters:

* `source`: - The key to the source list.
* `destination`: - The key to the destination list.
* `whereFrom`: - The 
* `whereTo`: - The 


#### :gear: blmove

Blocks the connection until it pops atomically and removes the left/right-most element to the
list stored at `source` depending on `whereFrom`, and pushes the element at the first/last element
of the list stored at `destination` depending on `whereTo`.
`BLMOVE` is the blocking variant of {@link lmove}.

| Method | Type |
| ---------- | ---------- |
| `blmove` | `(source: any, destination: any, whereFrom: ListDirection, whereTo: ListDirection, timeout: number) => T` |

Parameters:

* `source`: - The key to the source list.
* `destination`: - The key to the destination list.
* `whereFrom`: - The 
* `whereTo`: - The 
* `timeout`: - The number of seconds to wait for a blocking operation to complete. A value of `0` will block indefinitely.

Command Response - The popped element, or `null` if `source` does not exist or if the operation timed-out.


#### :gear: lset

Sets the list element at `index` to `element`.
The index is zero-based, so `0` means the first element, `1` the second element and so on.
Negative indices can be used to designate elements starting at the tail of
the list. Here, `-1` means the last element, `-2` means the penultimate and so forth.

| Method | Type |
| ---------- | ---------- |
| `lset` | `(key: any, index: number, element: any) => T` |

Parameters:

* `key`: - The key of the list.
* `index`: - The index of the element in the list to be set.
* `element`: - The new element to set at the specified index.

Command Response - Always "OK".


#### :gear: ltrim

Trim an existing list so that it will contain only the specified range of elements specified.
The offsets `start` and `end` are zero-based indexes, with 0 being the first element of the list, 1 being the next element and so on.
These offsets can also be negative numbers indicating offsets starting at the end of the list,
with -1 being the last element of the list, -2 being the penultimate, and so on.

| Method | Type |
| ---------- | ---------- |
| `ltrim` | `(key: any, start: number, end: number) => T` |

Parameters:

* `key`: - The key of the list.
* `start`: - The starting point of the range.
* `end`: - The end of the range.

Command Response - always "OK".
If `start` exceeds the end of the list, or if `start` is greater than `end`, the result will be an empty list (which causes key to be removed).
If `end` exceeds the actual end of the list, it will be treated like the last element of the list.
If `key` does not exist the command will be ignored.


#### :gear: lrem

Removes the first `count` occurrences of elements equal to `element` from the list stored at `key`.
If `count` is positive : Removes elements equal to `element` moving from head to tail.
If `count` is negative : Removes elements equal to `element` moving from tail to head.
If `count` is 0 or `count` is greater than the occurrences of elements equal to `element`: Removes all elements equal to `element`.

| Method | Type |
| ---------- | ---------- |
| `lrem` | `(key: any, count: number, element: any) => T` |

Parameters:

* `key`: - The key of the list.
* `count`: - The count of the occurrences of elements equal to `element` to remove.
* `element`: - The element to remove from the list.

Command Response - the number of the removed elements.
If `key` does not exist, 0 is returned.


#### :gear: rpush

Inserts all the specified values at the tail of the list stored at `key`.
`elements` are inserted one after the other to the tail of the list, from the leftmost element to the rightmost element.
If `key` does not exist, it is created as empty list before performing the push operations.

| Method | Type |
| ---------- | ---------- |
| `rpush` | `(key: any, elements: any[]) => T` |

Parameters:

* `key`: - The key of the list.
* `elements`: - The elements to insert at the tail of the list stored at `key`.

Command Response - the length of the list after the push operations.


#### :gear: rpushx

Inserts specified values at the tail of the `list`, only if `key` already
exists and holds a list.

| Method | Type |
| ---------- | ---------- |
| `rpushx` | `(key: any, elements: any[]) => T` |

Parameters:

* `key`: - The key of the list.
* `elements`: - The elements to insert at the tail of the list stored at `key`.

Command Response - The length of the list after the push operation.


#### :gear: rpop

Removes and returns the last elements of the list stored at `key`.
The command pops a single element from the end of the list.

| Method | Type |
| ---------- | ---------- |
| `rpop` | `(key: any) => T` |

Parameters:

* `key`: - The key of the list.

Command Response - The value of the last element.
If `key` does not exist null will be returned.


#### :gear: rpopCount

Removes and returns up to `count` elements from the list stored at `key`, depending on the list's length.

| Method | Type |
| ---------- | ---------- |
| `rpopCount` | `(key: any, count: number) => T` |

Parameters:

* `key`: - The key of the list.
* `count`: - The count of the elements to pop from the list.

Command Response - A list of popped elements will be returned depending on the list's length.
If `key` does not exist null will be returned.


#### :gear: sadd

Adds the specified members to the set stored at `key`. Specified members that are already a member of this set are ignored.
If `key` does not exist, a new set is created before adding `members`.

| Method | Type |
| ---------- | ---------- |
| `sadd` | `(key: any, members: any[]) => T` |

Parameters:

* `key`: - The key to store the members to its set.
* `members`: - A list of members to add to the set stored at `key`.

Command Response - the number of members that were added to the set, not including all the members already present in the set.


#### :gear: srem

Removes the specified members from the set stored at `key`. Specified members that are not a member of this set are ignored.

| Method | Type |
| ---------- | ---------- |
| `srem` | `(key: any, members: any[]) => T` |

Parameters:

* `key`: - The key to remove the members from its set.
* `members`: - A list of members to remove from the set stored at `key`.

Command Response - the number of members that were removed from the set, not including non existing members.
If `key` does not exist, it is treated as an empty set and this command returns 0.


#### :gear: sscan

Iterates incrementally over a set.

| Method | Type |
| ---------- | ---------- |
| `sscan` | `(key: any, cursor: any, options?: BaseScanOptions or undefined) => T` |

Parameters:

* `key`: - The key of the set.
* `cursor`: - The cursor that points to the next iteration of results. A value of `"0"` indicates the start of the search.
* `options`: - The (Optional) 


#### :gear: smembers

Returns all the members of the set value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `smembers` | `(key: any) => T` |

Parameters:

* `key`: - The key to return its members.

Command Response - all members of the set.
If `key` does not exist, it is treated as an empty set and this command returns empty list.


#### :gear: smove

Moves `member` from the set at `source` to the set at `destination`, removing it from the source set.
Creates a new destination set if needed. The operation is atomic.

| Method | Type |
| ---------- | ---------- |
| `smove` | `(source: any, destination: any, member: any) => T` |

Parameters:

* `source`: - The key of the set to remove the element from.
* `destination`: - The key of the set to add the element to.
* `member`: - The set element to move.

Command Response - `true` on success, or `false` if the `source` set does not exist or the element is not a member of the source set.


#### :gear: scard

Returns the set cardinality (number of elements) of the set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `scard` | `(key: any) => T` |

Parameters:

* `key`: - The key to return the number of its members.

Command Response - the cardinality (number of elements) of the set, or 0 if key does not exist.


#### :gear: sinter

Gets the intersection of all the given sets.
When in cluster mode, all `keys` must map to the same hash slot.

| Method | Type |
| ---------- | ---------- |
| `sinter` | `(keys: any[]) => T` |

Parameters:

* `keys`: - The `keys` of the sets to get the intersection.

Command Response - A set of members which are present in all given sets.
If one or more sets do not exist, an empty set will be returned.


#### :gear: sintercard

Gets the cardinality of the intersection of all the given sets.

| Method | Type |
| ---------- | ---------- |
| `sintercard` | `(keys: any[], options?: { limit?: number or undefined; } or undefined) => T` |

Parameters:

* `keys`: - The keys of the sets.
* `options`: - (Optional) Additional parameters:
- (Optional) `limit`: the limit for the intersection cardinality value. If not specified, or set to `0`, no limit is used.

Command Response - The cardinality of the intersection result. If one or more sets do not exist, `0` is returned.


#### :gear: sinterstore

Stores the members of the intersection of all given sets specified by `keys` into a new set at `destination`.

| Method | Type |
| ---------- | ---------- |
| `sinterstore` | `(destination: any, keys: any[]) => T` |

Parameters:

* `destination`: - The key of the destination set.
* `keys`: - The keys from which to retrieve the set members.

Command Response - The number of elements in the resulting set.


#### :gear: sdiff

Computes the difference between the first set and all the successive sets in `keys`.

| Method | Type |
| ---------- | ---------- |
| `sdiff` | `(keys: any[]) => T` |

Parameters:

* `keys`: - The keys of the sets to diff.

Command Response - A `Set` of elements representing the difference between the sets.
If a key in `keys` does not exist, it is treated as an empty set.


#### :gear: sdiffstore

Stores the difference between the first set and all the successive sets in `keys` into a new set at `destination`.

| Method | Type |
| ---------- | ---------- |
| `sdiffstore` | `(destination: any, keys: any[]) => T` |

Parameters:

* `destination`: - The key of the destination set.
* `keys`: - The keys of the sets to diff.

Command Response - The number of elements in the resulting set.


#### :gear: sunion

Gets the union of all the given sets.

| Method | Type |
| ---------- | ---------- |
| `sunion` | `(keys: any[]) => T` |

Parameters:

* `keys`: - The keys of the sets.

Command Response - A `Set` of members which are present in at least one of the given sets.
If none of the sets exist, an empty `Set` will be returned.


#### :gear: sunionstore

Stores the members of the union of all given sets specified by `keys` into a new set
at `destination`.

| Method | Type |
| ---------- | ---------- |
| `sunionstore` | `(destination: any, keys: any[]) => T` |

Parameters:

* `destination`: - The key of the destination set.
* `keys`: - The keys from which to retrieve the set members.

Command Response - The number of elements in the resulting set.


#### :gear: sismember

Returns if `member` is a member of the set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `sismember` | `(key: any, member: any) => T` |

Parameters:

* `key`: - The key of the set.
* `member`: - The member to check for existence in the set.

Command Response - `true` if the member exists in the set, `false` otherwise.
If `key` doesn't exist, it is treated as an empty set and the command returns `false`.


#### :gear: smismember

Checks whether each member is contained in the members of the set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `smismember` | `(key: any, members: any[]) => T` |

Parameters:

* `key`: - The key of the set to check.
* `members`: - A list of members to check for existence in the set.

Command Response - An `array` of `boolean` values, each indicating if the respective member exists in the set.


#### :gear: spop

Removes and returns one random member from the set value store at `key`.

| Method | Type |
| ---------- | ---------- |
| `spop` | `(key: any) => T` |

Parameters:

* `key`: - The key of the set.

Command Response - the value of the popped member.
If `key` does not exist, null will be returned.


#### :gear: spopCount

Removes and returns up to `count` random members from the set value store at `key`, depending on the set's length.

| Method | Type |
| ---------- | ---------- |
| `spopCount` | `(key: any, count: number) => T` |

Parameters:

* `key`: - The key of the set.
* `count`: - The count of the elements to pop from the set.

Command Response - A list of popped elements will be returned depending on the set's length.
If `key` does not exist, empty list will be returned.


#### :gear: srandmember

Returns a random element from the set value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `srandmember` | `(key: any) => T` |

Parameters:

* `key`: - The key from which to retrieve the set member.
Command Response - A random element from the set, or null if `key` does not exist.


#### :gear: srandmemberCount

Returns one or more random elements from the set value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `srandmemberCount` | `(key: any, count: number) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `count`: - The number of members to return.
  If `count` is positive, returns unique members.
  If `count` is negative, allows for duplicates members.
Command Response - A list of members from the set. If the set does not exist or is empty, an empty list will be returned.


#### :gear: exists

Returns the number of keys in `keys` that exist in the database.

| Method | Type |
| ---------- | ---------- |
| `exists` | `(keys: any[]) => T` |

Parameters:

* `keys`: - The keys list to check.

Command Response - the number of keys that exist. If the same existing key is mentioned in `keys` multiple times,
it will be counted multiple times.


#### :gear: unlink

Removes the specified keys. A key is ignored if it does not exist.
This command, similar to {@link del}, removes specified keys and ignores non-existent ones.
However, this command does not block the server, while {@link https://valkey.io/commands/del `DEL`} does.

| Method | Type |
| ---------- | ---------- |
| `unlink` | `(keys: any[]) => T` |

Parameters:

* `keys`: - The keys we wanted to unlink.

Command Response - The number of keys that were unlinked.


#### :gear: expire

Sets a timeout on `key` in seconds. After the timeout has expired, the key will automatically be deleted.
If `key` already has an existing expire set, the time to live is updated to the new value.
If `seconds` is non-positive number, the key will be deleted rather than expired.
The timeout will only be cleared by commands that delete or overwrite the contents of `key`.

| Method | Type |
| ---------- | ---------- |
| `expire` | `(key: any, seconds: number, options?: { expireOption?: ExpireOptions or undefined; } or undefined) => T` |

Parameters:

* `key`: - The key to set timeout on it.
* `seconds`: - The timeout in seconds.
* `options`: - (Optional) Additional parameters:
- (Optional) `expireOption`: the expire option - see 


#### :gear: expireAt

Sets a timeout on `key`. It takes an absolute Unix timestamp (seconds since January 1, 1970) instead of specifying the number of seconds.
A timestamp in the past will delete the key immediately. After the timeout has expired, the key will automatically be deleted.
If `key` already has an existing expire set, the time to live is updated to the new value.
The timeout will only be cleared by commands that delete or overwrite the contents of `key`.

| Method | Type |
| ---------- | ---------- |
| `expireAt` | `(key: any, unixSeconds: number, options?: { expireOption?: ExpireOptions or undefined; } or undefined) => T` |

Parameters:

* `key`: - The key to set timeout on it.
* `unixSeconds`: - The timeout in an absolute Unix timestamp.
* `options`: - (Optional) Additional parameters:
- (Optional) `expireOption`: the expire option - see 


#### :gear: expireTime

Returns the absolute Unix timestamp (since January 1, 1970) at which the given `key` will expire, in seconds.
To get the expiration with millisecond precision, use {@link pexpiretime }.

| Method | Type |
| ---------- | ---------- |
| `expireTime` | `(key: any) => T` |

Parameters:

* `key`: - The `key` to determine the expiration value of.

Command Response - The expiration Unix timestamp in seconds, `-2` if `key` does not exist or `-1` if `key` exists but has no associated expire.


#### :gear: pexpire

Sets a timeout on `key` in milliseconds. After the timeout has expired, the key will automatically be deleted.
If `key` already has an existing expire set, the time to live is updated to the new value.
If `milliseconds` is non-positive number, the key will be deleted rather than expired.
The timeout will only be cleared by commands that delete or overwrite the contents of `key`.

| Method | Type |
| ---------- | ---------- |
| `pexpire` | `(key: any, milliseconds: number, options?: { expireOption?: ExpireOptions or undefined; } or undefined) => T` |

Parameters:

* `key`: - The key to set timeout on it.
* `milliseconds`: - The timeout in milliseconds.
* `options`: - (Optional) Additional parameters:
- (Optional) `expireOption`: the expire option - see 


#### :gear: pexpireAt

Sets a timeout on `key`. It takes an absolute Unix timestamp (milliseconds since January 1, 1970) instead of specifying the number of milliseconds.
A timestamp in the past will delete the key immediately. After the timeout has expired, the key will automatically be deleted.
If `key` already has an existing expire set, the time to live is updated to the new value.
The timeout will only be cleared by commands that delete or overwrite the contents of `key`.

| Method | Type |
| ---------- | ---------- |
| `pexpireAt` | `(key: any, unixMilliseconds: number, options?: { expireOption?: ExpireOptions or undefined; } or undefined) => T` |

Parameters:

* `key`: - The key to set timeout on it.
* `unixMilliseconds`: - The timeout in an absolute Unix timestamp.
* `options`: - (Optional) Additional parameters:
- (Optional) `expireOption`: the expire option - see 


#### :gear: pexpireTime

Returns the absolute Unix timestamp (since January 1, 1970) at which the given `key` will expire, in milliseconds.

| Method | Type |
| ---------- | ---------- |
| `pexpireTime` | `(key: any) => T` |

Parameters:

* `key`: - The `key` to determine the expiration value of.

Command Response - The expiration Unix timestamp in seconds, `-2` if `key` does not exist or `-1` if `key` exists but has no associated expire.


#### :gear: ttl

Returns the remaining time to live of `key` that has a timeout.

| Method | Type |
| ---------- | ---------- |
| `ttl` | `(key: any) => T` |

Parameters:

* `key`: - The key to return its timeout.

Command Response - TTL in seconds, `-2` if `key` does not exist or `-1` if `key` exists but has no associated expire.


#### :gear: zadd

Adds members with their scores to the sorted set stored at `key`.
If a member is already a part of the sorted set, its score is updated.

| Method | Type |
| ---------- | ---------- |
| `zadd` | `(key: any, membersAndScores: SortedSetDataType or Record<string, number>, options?: ZAddOptions or undefined) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `membersAndScores`: - A list of members and their corresponding scores or a mapping of members to their corresponding scores.
* `options`: - (Optional) The `ZADD` options - see 


#### :gear: zaddIncr

Increments the score of member in the sorted set stored at `key` by `increment`.
If `member` does not exist in the sorted set, it is added with `increment` as its score (as if its previous score was 0.0).
If `key` does not exist, a new sorted set with the specified member as its sole member is created.

| Method | Type |
| ---------- | ---------- |
| `zaddIncr` | `(key: any, member: any, increment: number, options?: ZAddOptions or undefined) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `member`: - A member in the sorted set to increment.
* `increment`: - The score to increment the member.
* `options`: - (Optional) The `ZADD` options - see 


#### :gear: zrem

Removes the specified members from the sorted set stored at `key`.
Specified members that are not a member of this set are ignored.

| Method | Type |
| ---------- | ---------- |
| `zrem` | `(key: any, members: any[]) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `members`: - A list of members to remove from the sorted set.

Command Response - The number of members that were removed from the sorted set, not including non-existing members.
If `key` does not exist, it is treated as an empty sorted set, and this command returns 0.


#### :gear: zcard

Returns the cardinality (number of elements) of the sorted set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `zcard` | `(key: any) => T` |

Parameters:

* `key`: - The key of the sorted set.

Command Response - The number of elements in the sorted set.
If `key` does not exist, it is treated as an empty sorted set, and this command returns `0`.


#### :gear: zintercard

Returns the cardinality of the intersection of the sorted sets specified by `keys`.

| Method | Type |
| ---------- | ---------- |
| `zintercard` | `(keys: any[], options?: { limit?: number or undefined; } or undefined) => T` |

Parameters:

* `keys`: - The keys of the sorted sets to intersect.
* `options`: - (Optional) Additional parameters:
- (Optional) `limit`: the limit for the intersection cardinality value. If not specified, or set to `0`, no limit is used.

Command Response - The cardinality of the intersection of the given sorted sets.


#### :gear: zdiff

Returns the difference between the first sorted set and all the successive sorted sets.
To get the elements with their scores, see {@link zdiffWithScores}.

| Method | Type |
| ---------- | ---------- |
| `zdiff` | `(keys: any[]) => T` |

Parameters:

* `keys`: - The keys of the sorted sets.

Command Response - An `array` of elements representing the difference between the sorted sets.
If the first key does not exist, it is treated as an empty sorted set, and the command returns an empty `array`.


#### :gear: zdiffWithScores

Returns the difference between the first sorted set and all the successive sorted sets, with the associated
scores.

| Method | Type |
| ---------- | ---------- |
| `zdiffWithScores` | `(keys: any[]) => T` |

Parameters:

* `keys`: - The keys of the sorted sets.

Command Response - A list of elements and their scores representing the difference between the sorted sets.
If the first key does not exist, it is treated as an empty sorted set, and the command returns an empty `array`.
The response comes in format `GlideRecord<number>`, see 


#### :gear: zdiffstore

Calculates the difference between the first sorted set and all the successive sorted sets in `keys` and stores
the difference as a sorted set to `destination`, overwriting it if it already exists. Non-existent keys are
treated as empty sets.

| Method | Type |
| ---------- | ---------- |
| `zdiffstore` | `(destination: any, keys: any[]) => T` |

Parameters:

* `destination`: - The key for the resulting sorted set.
* `keys`: - The keys of the sorted sets to compare.

Command Response - The number of members in the resulting sorted set stored at `destination`.


#### :gear: zscore

Returns the score of `member` in the sorted set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `zscore` | `(key: any, member: any) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `member`: - The member whose score is to be retrieved.

Command Response - The score of the member.
If `member` does not exist in the sorted set, null is returned.
If `key` does not exist, null is returned.


#### :gear: zunionstore

Computes the union of sorted sets given by the specified `keys` and stores the result in `destination`.
If `destination` already exists, it is overwritten. Otherwise, a new sorted set will be created.
To get the result directly, see {@link zunionWithScores}.

| Method | Type |
| ---------- | ---------- |
| `zunionstore` | `(destination: any, keys: any[] or KeyWeight[], options?: { aggregationType?: AggregationType or undefined; } or undefined) => T` |

Parameters:

* `destination`: - The key of the destination sorted set.
* `keys`: - The keys of the sorted sets with possible formats:
- `GlideString[]` - for keys only.
- `KeyWeight[]` - for weighted keys with their score multipliers.
* `options`: - (Optional) Additional parameters:
- (Optional) `aggregationType`: the aggregation strategy to apply when combining the scores of elements. See 


#### :gear: zmscore

Returns the scores associated with the specified `members` in the sorted set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `zmscore` | `(key: any, members: any[]) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `members`: - A list of members in the sorted set.

Command Response - An `array` of scores corresponding to `members`.
If a member does not exist in the sorted set, the corresponding value in the list will be `null`.


#### :gear: zcount

Returns the number of members in the sorted set stored at `key` with scores between `minScore` and `maxScore`.

| Method | Type |
| ---------- | ---------- |
| `zcount` | `(key: any, minScore: Boundary<number>, maxScore: Boundary<number>) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `minScore`: - The minimum score to count from. Can be positive/negative infinity, or specific score and inclusivity.
* `maxScore`: - The maximum score to count up to. Can be positive/negative infinity, or specific score and inclusivity.

Command Response - The number of members in the specified score range.
If `key` does not exist, it is treated as an empty sorted set, and the command returns `0`.
If `minScore` is greater than `maxScore`, `0` is returned.


#### :gear: zrange

Returns the specified range of elements in the sorted set stored at `key`.
`ZRANGE` can perform different types of range queries: by index (rank), by the score, or by lexicographical order.

To get the elements with their scores, see {@link zrangeWithScores}.

| Method | Type |
| ---------- | ---------- |
| `zrange` | `(key: any, rangeQuery: RangeByScore or RangeByLex or RangeByIndex, reverse?: boolean) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `rangeQuery`: - The range query object representing the type of range query to perform.
- For range queries by index (rank), use 
* `reverse`: - If `true`, reverses the sorted set, with index `0` as the element with the highest score.

Command Response - A list of elements within the specified range.
If `key` does not exist, it is treated as an empty sorted set, and the command returns an empty array.


#### :gear: zrangeWithScores

Returns the specified range of elements with their scores in the sorted set stored at `key`.
Similar to {@link ZRange } but with a `WITHSCORE` flag.

| Method | Type |
| ---------- | ---------- |
| `zrangeWithScores` | `(key: any, rangeQuery: RangeByScore or RangeByLex or RangeByIndex, reverse?: boolean) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `rangeQuery`: - The range query object representing the type of range query to perform.
- For range queries by index (rank), use 
* `reverse`: - If `true`, reverses the sorted set, with index `0` as the element with the highest score.

Command Response - A list of elements and their scores within the specified range.
If `key` does not exist, it is treated as an empty sorted set, and the command returns an empty list.
The response comes in format `GlideRecord<number>`, see 


#### :gear: zrangeStore

Stores a specified range of elements from the sorted set at `source`, into a new
sorted set at `destination`. If `destination` doesn't exist, a new sorted
set is created; if it exists, it's overwritten.

| Method | Type |
| ---------- | ---------- |
| `zrangeStore` | `(destination: any, source: any, rangeQuery: RangeByScore or RangeByLex or RangeByIndex, reverse?: boolean) => T` |

Parameters:

* `destination`: - The key for the destination sorted set.
* `source`: - The key of the source sorted set.
* `rangeQuery`: - The range query object representing the type of range query to perform.
- For range queries by index (rank), use 
* `reverse`: - If `true`, reverses the sorted set, with index `0` as the element with the highest score.

Command Response - The number of elements in the resulting sorted set.


#### :gear: zinterstore

Computes the intersection of sorted sets given by the specified `keys` and stores the result in `destination`.
If `destination` already exists, it is overwritten. Otherwise, a new sorted set will be created.

| Method | Type |
| ---------- | ---------- |
| `zinterstore` | `(destination: any, keys: any[] or KeyWeight[], options?: { aggregationType?: AggregationType or undefined; } or undefined) => T` |

Parameters:

* `destination`: - The key of the destination sorted set.
* `keys`: - The keys of the sorted sets with possible formats:
- `GlideString[]` - for keys only.
- `KeyWeight[]` - for weighted keys with score multipliers.
* `options`: - (Optional) Additional parameters:
- (Optional) `aggregationType`: the aggregation strategy to apply when combining the scores of elements. See 


#### :gear: zinter

Computes the intersection of sorted sets given by the specified `keys` and returns a list of intersecting elements.
To get the scores as well, see {@link zinterWithScores}.
To store the result in a key as a sorted set, see {@link zinterStore }.

| Method | Type |
| ---------- | ---------- |
| `zinter` | `(keys: any[]) => T` |

Parameters:

* `keys`: - The keys of the sorted sets.

Command Response - The resulting array of intersecting elements.


#### :gear: zinterWithScores

Computes the intersection of sorted sets given by the specified `keys` and returns a list of intersecting elements with scores.
To get the elements only, see {@link zinter}.
To store the result in a key as a sorted set, see {@link zinterStore }.

| Method | Type |
| ---------- | ---------- |
| `zinterWithScores` | `(keys: any[] or KeyWeight[], options?: { aggregationType?: AggregationType or undefined; } or undefined) => T` |

Parameters:

* `keys`: - The keys of the sorted sets with possible formats:
- `GlideString[]` - for keys only.
- `KeyWeight[]` - for weighted keys with score multipliers.
* `options`: - (Optional) Additional parameters:
- (Optional) `aggregationType`: the aggregation strategy to apply when combining the scores of elements. See 


#### :gear: zunion

Computes the union of sorted sets given by the specified `keys` and returns a list of union elements.

To get the scores as well, see {@link zunionWithScores}.
To store the result in a key as a sorted set, see {@link zunionstore}.

| Method | Type |
| ---------- | ---------- |
| `zunion` | `(keys: any[]) => T` |

Parameters:

* `keys`: - The keys of the sorted sets.

Command Response - The resulting array with a union of sorted set elements.


#### :gear: zunionWithScores

Computes the intersection of sorted sets given by the specified `keys` and returns a list of union elements with scores.
To get the elements only, see {@link zunion}.

| Method | Type |
| ---------- | ---------- |
| `zunionWithScores` | `(keys: any[] or KeyWeight[], options?: { aggregationType?: AggregationType or undefined; } or undefined) => T` |

Parameters:

* `keys`: - The keys of the sorted sets with possible formats:
- `GlideString[]` - for keys only.
- `KeyWeight[]` - for weighted keys with their score multipliers.
* `options`: - (Optional) Additional parameters:
- (Optional) `aggregationType`: the aggregation strategy to apply when combining the scores of elements. See 


#### :gear: zrandmember

Returns a random member from the sorted set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `zrandmember` | `(key: any) => T` |

Parameters:

* `keys`: - The key of the sorted set.

Command Response - A string representing a random member from the sorted set.
If the sorted set does not exist or is empty, the response will be `null`.


#### :gear: zrandmemberWithCount

Returns random members from the sorted set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `zrandmemberWithCount` | `(key: any, count: number) => T` |

Parameters:

* `keys`: - The key of the sorted set.
* `count`: - The number of members to return.
If `count` is positive, returns unique members.
If negative, allows for duplicates.

Command Response - An `array` of members from the sorted set.
If the sorted set does not exist or is empty, the response will be an empty `array`.


#### :gear: zrandmemberWithCountWithScores

Returns random members with scores from the sorted set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `zrandmemberWithCountWithScores` | `(key: any, count: number) => T` |

Parameters:

* `keys`: - The key of the sorted set.
* `count`: - The number of members to return.
If `count` is positive, returns unique members.
If negative, allows for duplicates.

Command Response - A list of 


#### :gear: type

Returns the string representation of the type of the value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `type` | `(key: any) => T` |

Parameters:

* `key`: - The key to check its data type.

Command Response - If the key exists, the type of the stored value is returned. Otherwise, a "none" string is returned.


#### :gear: strlen

Returns the length of the string value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `strlen` | `(key: any) => T` |

Parameters:

* `key`: - The `key` to check its length.

Command Response - The length of the string value stored at `key`
If `key` does not exist, it is treated as an empty string, and the command returns `0`.


#### :gear: zpopmin

Removes and returns the members with the lowest scores from the sorted set stored at `key`.
If `count` is provided, up to `count` members with the lowest scores are removed and returned.
Otherwise, only one member with the lowest score is removed and returned.

| Method | Type |
| ---------- | ---------- |
| `zpopmin` | `(key: any, count?: number or undefined) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `count`: - Specifies the quantity of members to pop. If not specified, pops one member.

Command Response - A list of the removed members and their scores, ordered from the one with the lowest score to the one with the highest.
If `key` doesn't exist, it will be treated as an empty sorted set and the command returns an empty map.
If `count` is higher than the sorted set's cardinality, returns all members and their scores.
The response comes in format `GlideRecord<number>`, see 


#### :gear: bzpopmin

Blocks the connection until it removes and returns a member with the lowest score from the
first non-empty sorted set, with the given `key` being checked in the order they
are provided.
`BZPOPMIN` is the blocking variant of {@link zpopmin}.

| Method | Type |
| ---------- | ---------- |
| `bzpopmin` | `(keys: any[], timeout: number) => T` |

Parameters:

* `keys`: - The keys of the sorted sets.
* `timeout`: - The number of seconds to wait for a blocking operation to complete. A value of
`0` will block indefinitely. Since Valkey version 6.0.0: timeout is interpreted as a double instead of an integer.

Command Response - An `array` containing the key where the member was popped out, the member, itself, and the member score.
If no member could be popped and the `timeout` expired, returns `null`.


#### :gear: zpopmax

Removes and returns the members with the highest scores from the sorted set stored at `key`.
If `count` is provided, up to `count` members with the highest scores are removed and returned.
Otherwise, only one member with the highest score is removed and returned.

| Method | Type |
| ---------- | ---------- |
| `zpopmax` | `(key: any, count?: number or undefined) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `count`: - Specifies the quantity of members to pop. If not specified, pops one member.

Command Response - A list of the removed members and their scores, ordered from the one with the lowest score to the one with the highest.
If `key` doesn't exist, it will be treated as an empty sorted set and the command returns an empty map.
If `count` is higher than the sorted set's cardinality, returns all members and their scores.
The response comes in format `GlideRecord<number>`, see 


#### :gear: bzpopmax

Blocks the connection until it removes and returns a member with the highest score from the
first non-empty sorted set, with the given `key` being checked in the order they
are provided.
`BZPOPMAX` is the blocking variant of {@link zpopmax}.

| Method | Type |
| ---------- | ---------- |
| `bzpopmax` | `(keys: any[], timeout: number) => T` |

Parameters:

* `keys`: - The keys of the sorted sets.
* `timeout`: - The number of seconds to wait for a blocking operation to complete. A value of
`0` will block indefinitely. Since 6.0.0: timeout is interpreted as a double instead of an integer.

Command Response - An `array` containing the key where the member was popped out, the member, itself, and the member score.
If no member could be popped and the `timeout` expired, returns `null`.


#### :gear: echo

Echoes the provided `message` back

| Method | Type |
| ---------- | ---------- |
| `echo` | `(message: any) => T` |

Parameters:

* `message`: - The message to be echoed back.

Command Response - The provided `message`.


#### :gear: pttl

Returns the remaining time to live of `key` that has a timeout, in milliseconds.

| Method | Type |
| ---------- | ---------- |
| `pttl` | `(key: any) => T` |

Parameters:

* `key`: - The key to return its timeout.

Command Response - TTL in milliseconds, `-2` if `key` does not exist, `-1` if `key` exists but has no associated expire.


#### :gear: zremRangeByRank

Removes all elements in the sorted set stored at `key` with rank between `start` and `end`.
Both `start` and `end` are zero-based indexes with 0 being the element with the lowest score.
These indexes can be negative numbers, where they indicate offsets starting at the element with the highest score.

| Method | Type |
| ---------- | ---------- |
| `zremRangeByRank` | `(key: any, start: number, end: number) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `start`: - The starting point of the range.
* `end`: - The end of the range.

Command Response - The number of members removed.
If `start` exceeds the end of the sorted set, or if `start` is greater than `end`, 0 returned.
If `end` exceeds the actual end of the sorted set, the range will stop at the actual end of the sorted set.
If `key` does not exist 0 will be returned.


#### :gear: zremRangeByLex

Removes all elements in the sorted set stored at `key` with lexicographical order between `minLex` and `maxLex`.

| Method | Type |
| ---------- | ---------- |
| `zremRangeByLex` | `(key: any, minLex: Boundary<any>, maxLex: Boundary<any>) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `minLex`: - The minimum lex to count from. Can be negative infinity, or a specific lex and inclusivity.
* `maxLex`: - The maximum lex to count up to. Can be positive infinity, or a specific lex and inclusivity.

Command Response - The number of members removed.
If `key` does not exist, it is treated as an empty sorted set, and the command returns 0.
If `minLex` is greater than `maxLex`, 0 is returned.


#### :gear: zremRangeByScore

Removes all elements in the sorted set stored at `key` with a score between `minScore` and `maxScore`.

| Method | Type |
| ---------- | ---------- |
| `zremRangeByScore` | `(key: any, minScore: Boundary<number>, maxScore: Boundary<number>) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `minScore`: - The minimum score to remove from. Can be negative infinity, or specific score and inclusivity.
* `maxScore`: - The maximum score to remove to. Can be positive infinity, or specific score and inclusivity.

Command Response - the number of members removed.
If `key` does not exist, it is treated as an empty sorted set, and the command returns 0.
If `minScore` is greater than `maxScore`, 0 is returned.


#### :gear: zlexcount

Returns the number of members in the sorted set stored at 'key' with scores between 'minLex' and 'maxLex'.

| Method | Type |
| ---------- | ---------- |
| `zlexcount` | `(key: any, minLex: Boundary<any>, maxLex: Boundary<any>) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `minLex`: - The minimum lex to count from. Can be negative infinity, or a specific lex and inclusivity.
* `maxLex`: - The maximum lex to count up to. Can be positive infinity, or a specific lex and inclusivity.

Command Response - The number of members in the specified lex range.
If 'key' does not exist, it is treated as an empty sorted set, and the command returns '0'.
If maxLex is less than minLex, '0' is returned.


#### :gear: zrank

Returns the rank of `member` in the sorted set stored at `key`, with scores ordered from low to high.
To get the rank of `member` with its score, see {@link zrankWithScore}.

| Method | Type |
| ---------- | ---------- |
| `zrank` | `(key: any, member: any) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `member`: - The member whose rank is to be retrieved.

Command Response - The rank of `member` in the sorted set.
If `key` doesn't exist, or if `member` is not present in the set, null will be returned.


#### :gear: zrankWithScore

Returns the rank of `member` in the sorted set stored at `key` with its score, where scores are ordered from the lowest to highest.

| Method | Type |
| ---------- | ---------- |
| `zrankWithScore` | `(key: any, member: any) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `member`: - The member whose rank is to be retrieved.

Command Response - A list containing the rank and score of `member` in the sorted set.
If `key` doesn't exist, or if `member` is not present in the set, null will be returned.


#### :gear: zrevrank

Returns the rank of `member` in the sorted set stored at `key`, where
scores are ordered from the highest to lowest, starting from `0`.
To get the rank of `member` with its score, see {@link zrevrankWithScore}.

| Method | Type |
| ---------- | ---------- |
| `zrevrank` | `(key: any, member: any) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `member`: - The member whose rank is to be retrieved.

Command Response - The rank of `member` in the sorted set, where ranks are ordered from high to low based on scores.
If `key` doesn't exist, or if `member` is not present in the set, `null` will be returned.


#### :gear: zrevrankWithScore

Returns the rank of `member` in the sorted set stored at `key` with its
score, where scores are ordered from the highest to lowest, starting from `0`.

| Method | Type |
| ---------- | ---------- |
| `zrevrankWithScore` | `(key: any, member: any) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `member`: - The member whose rank is to be retrieved.

Command Response -  A list containing the rank and score of `member` in the sorted set, where ranks
are ordered from high to low based on scores.
If `key` doesn't exist, or if `member` is not present in the set, `null` will be returned.


#### :gear: persist

Removes the existing timeout on `key`, turning the key from volatile (a key with an expire set) to
persistent (a key that will never expire as no timeout is associated).

| Method | Type |
| ---------- | ---------- |
| `persist` | `(key: any) => T` |

Parameters:

* `key`: - The key to remove the existing timeout on.

Command Response - `false` if `key` does not exist or does not have an associated timeout, `true` if the timeout has been removed.


#### :gear: customCommand

Executes a single command, without checking inputs. Every part of the command, including subcommands,
should be added as a separate value in args.

| Method | Type |
| ---------- | ---------- |
| `customCommand` | `(args: any[]) => T` |

#### :gear: lindex

Returns the element at index `index` in the list stored at `key`.
The index is zero-based, so 0 means the first element, 1 the second element and so on.
Negative indices can be used to designate elements starting at the tail of the list.
Here, -1 means the last element, -2 means the penultimate and so forth.

| Method | Type |
| ---------- | ---------- |
| `lindex` | `(key: any, index: number) => T` |

Parameters:

* `key`: - The `key` of the list.
* `index`: - The `index` of the element in the list to retrieve.
Command Response - The element at index in the list stored at `key`.
If `index` is out of range or if `key` does not exist, null is returned.


#### :gear: linsert

Inserts `element` in the list at `key` either before or after the `pivot`.

| Method | Type |
| ---------- | ---------- |
| `linsert` | `(key: any, position: InsertPosition, pivot: any, element: any) => T` |

Parameters:

* `key`: - The key of the list.
* `position`: - The relative position to insert into - either `InsertPosition.Before` or
`InsertPosition.After` the `pivot`.
* `pivot`: - An element of the list.
* `element`: - The new element to insert.

Command Response - The list length after a successful insert operation.
If the `key` doesn't exist returns `-1`.
If the `pivot` wasn't found, returns `0`.


#### :gear: xadd

Adds an entry to the specified stream stored at `key`. If the `key` doesn't exist, the stream is created.

| Method | Type |
| ---------- | ---------- |
| `xadd` | `(key: any, values: [any, any][], options?: StreamAddOptions or undefined) => T` |

Parameters:

* `key`: - The key of the stream.
* `values`: - field-value pairs to be added to the entry.
* `options`: - (Optional) Stream add options.

Command Response - The id of the added entry, or `null` if `options.makeStream` is set to `false` and no stream with the matching `key` exists.


#### :gear: xdel

Removes the specified entries by id from a stream, and returns the number of entries deleted.

| Method | Type |
| ---------- | ---------- |
| `xdel` | `(key: any, ids: string[]) => T` |

Parameters:

* `key`: - The key of the stream.
* `ids`: - An array of entry ids.

Command Response - The number of entries removed from the stream. This number may be less than the number of entries in
`ids`, if the specified `ids` don't exist in the stream.


#### :gear: xtrim

Trims the stream stored at `key` by evicting older entries.

| Method | Type |
| ---------- | ---------- |
| `xtrim` | `(key: any, options: StreamTrimOptions) => T` |

Parameters:

* `key`: - the key of the stream
* `options`: - options detailing how to trim the stream.

Command Response - The number of entries deleted from the stream. If `key` doesn't exist, 0 is returned.


#### :gear: xinfoStream

Returns information about the stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xinfoStream` | `(key: any, fullOptions?: number or boolean or undefined) => T` |

Parameters:

* `key`: - The key of the stream.
* `fullOptions`: - If `true`, returns verbose information with a limit of the first 10 PEL entries.
If `number` is specified, returns verbose information limiting the returned PEL entries.
If `0` is specified, returns verbose information with no limit.

Command Response - Detailed stream information for the given `key`.
See example of 


#### :gear: xinfoGroups

Returns the list of all consumer groups and their attributes for the stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xinfoGroups` | `(key: any) => T` |

Parameters:

* `key`: - The key of the stream.

Command Response -  An `Array` of `Records`, where each mapping represents the
attributes of a consumer group for the stream at `key`.
The response comes in format `GlideRecord<GlideString | number | null>[]`, see 


#### :gear: time

Returns the server time.

| Method | Type |
| ---------- | ---------- |
| `time` | `() => T` |

#### :gear: xrange

Returns stream entries matching a given range of entry IDs.

| Method | Type |
| ---------- | ---------- |
| `xrange` | `(key: any, start: Boundary<string>, end: Boundary<string>, count?: number or undefined) => T` |

Parameters:

* `key`: - The key of the stream.
* `start`: - The starting stream entry ID bound for the range.
- Use `value` to specify a stream entry ID.
- Use `isInclusive: false` to specify an exclusive bounded stream entry ID. This is only available starting with Valkey version 6.2.0.
- Use `InfBoundary.NegativeInfinity` to start with the minimum available ID.
* `end`: - The ending stream ID bound for the range.
- Use `value` to specify a stream entry ID.
- Use `isInclusive: false` to specify an exclusive bounded stream entry ID. This is only available starting with Valkey version 6.2.0.
- Use `InfBoundary.PositiveInfinity` to end with the maximum available ID.
* `count`: - An optional argument specifying the maximum count of stream entries to return.
If `count` is not provided, all stream entries in the range will be returned.

Command Response - A list of stream entry ids, to an array of entries, or `null` if `count` is non-positive.
The response comes in format `GlideRecord<[GlideString, GlideString][]> | null`, see 


#### :gear: xrevrange

Returns stream entries matching a given range of entry IDs in reverse order. Equivalent to {@link xrange} but returns the
entries in reverse order.

| Method | Type |
| ---------- | ---------- |
| `xrevrange` | `(key: any, end: Boundary<string>, start: Boundary<string>, count?: number or undefined) => T` |

Parameters:

* `key`: - The key of the stream.
* `end`: - The ending stream entry ID bound for the range.
- Use `value` to specify a stream entry ID.
- Use `isInclusive: false` to specify an exclusive bounded stream entry ID. This is only available starting with Valkey version 6.2.0.
- Use `InfBoundary.PositiveInfinity` to end with the maximum available ID.
* `start`: - The ending stream ID bound for the range.
- Use `value` to specify a stream entry ID.
- Use `isInclusive: false` to specify an exclusive bounded stream entry ID. This is only available starting with Valkey version 6.2.0.
- Use `InfBoundary.NegativeInfinity` to start with the minimum available ID.
* `count`: - An optional argument specifying the maximum count of stream entries to return.
If `count` is not provided, all stream entries in the range will be returned.

Command Response - A list of stream entry ids, to an array of entries, or `null` if `count` is non-positive.
The response comes in format `GlideRecord<[GlideString, GlideString][]> | null`, see 


#### :gear: xread

Reads entries from the given streams.

| Method | Type |
| ---------- | ---------- |
| `xread` | `(keys_and_ids: Record<string, string> or GlideRecord<string>, options?: StreamReadOptions or undefined) => T` |

Parameters:

* `keys_and_ids`: - An object of stream keys and entry IDs to read from.
* `options`: - (Optional) Parameters detailing how to read the stream - see 


#### :gear: xreadgroup

Reads entries from the given streams owned by a consumer group.

| Method | Type |
| ---------- | ---------- |
| `xreadgroup` | `(group: any, consumer: any, keys_and_ids: Record<string, string> or GlideRecord<string>, options?: StreamReadGroupOptions or undefined) => T` |

Parameters:

* `group`: - The consumer group name.
* `consumer`: - The group consumer.
* `keys_and_ids`: - An object of stream keys and entry IDs to read from.
Use the special ID of `">"` to receive only new messages.
* `options`: - (Optional) Parameters detailing how to read the stream - see 


#### :gear: xlen

Returns the number of entries in the stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xlen` | `(key: any) => T` |

Parameters:

* `key`: - The key of the stream.

Command Response - The number of entries in the stream. If `key` does not exist, returns `0`.


#### :gear: xpending

Returns stream message summary information for pending messages matching a given range of IDs.

| Method | Type |
| ---------- | ---------- |
| `xpending` | `(key: any, group: any) => T` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.

Command Response - An `array` that includes the summary of the pending messages.
See example of 


#### :gear: xpendingWithOptions

Returns stream message summary information for pending messages matching a given range of IDs.

| Method | Type |
| ---------- | ---------- |
| `xpendingWithOptions` | `(key: any, group: any, options: StreamPendingOptions) => T` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.
* `options`: - Additional options to filter entries, see 


#### :gear: xinfoConsumers

Returns the list of all consumers and their attributes for the given consumer group of the
stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xinfoConsumers` | `(key: any, group: any) => T` |

#### :gear: xclaim

Changes the ownership of a pending message.

| Method | Type |
| ---------- | ---------- |
| `xclaim` | `(key: any, group: any, consumer: any, minIdleTime: number, ids: string[], options?: StreamClaimOptions or undefined) => T` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.
* `consumer`: - The group consumer.
* `minIdleTime`: - The minimum idle time for the message to be claimed.
* `ids`: - An array of entry ids.
* `options`: - (Optional) Stream claim options 


#### :gear: xclaimJustId

Changes the ownership of a pending message. This function returns an `array` with
only the message/entry IDs, and is equivalent to using `JUSTID` in the Valkey API.

| Method | Type |
| ---------- | ---------- |
| `xclaimJustId` | `(key: any, group: any, consumer: any, minIdleTime: number, ids: string[], options?: StreamClaimOptions or undefined) => T` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.
* `consumer`: - The group consumer.
* `minIdleTime`: - The minimum idle time for the message to be claimed.
* `ids`: - An array of entry ids.
* `options`: - (Optional) Stream claim options 


#### :gear: xautoclaim

Transfers ownership of pending stream entries that match the specified criteria.

| Method | Type |
| ---------- | ---------- |
| `xautoclaim` | `(key: any, group: any, consumer: any, minIdleTime: number, start: string, options?: { count?: number or undefined; } or undefined) => T` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.
* `consumer`: - The group consumer.
* `minIdleTime`: - The minimum idle time for the message to be claimed.
* `start`: - Filters the claimed entries to those that have an ID equal or greater than the
specified value.
* `options`: - (Optional) Additional parameters:
- (Optional) `count`: the number of claimed entries.

Command Response - An `array` containing the following elements:
- A stream ID to be used as the start argument for the next call to `XAUTOCLAIM`. This ID is
equivalent to the next ID in the stream after the entries that were scanned, or "0-0" if
the entire stream was scanned.
- A mapping of the claimed entries.
- If you are using Valkey 7.0.0 or above, the response list will also include a list containing
the message IDs that were in the Pending Entries List but no longer exist in the stream.
These IDs are deleted from the Pending Entries List.

The response comes in format `[GlideString, GlideRecord<[GlideString, GlideString][]>, GlideString[]?]`, see 


#### :gear: xautoclaimJustId

Transfers ownership of pending stream entries that match the specified criteria.

| Method | Type |
| ---------- | ---------- |
| `xautoclaimJustId` | `(key: any, group: any, consumer: any, minIdleTime: number, start: string, options?: { count?: number or undefined; } or undefined) => T` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.
* `consumer`: - The group consumer.
* `minIdleTime`: - The minimum idle time for the message to be claimed.
* `start`: - Filters the claimed entries to those that have an ID equal or greater than the
specified value.
* `options`: - (Optional) Additional parameters:
- (Optional) `count`: limits the number of claimed entries to the specified value.

Command Response - An `array` containing the following elements:
- A stream ID to be used as the start argument for the next call to `XAUTOCLAIM`. This ID is
equivalent to the next ID in the stream after the entries that were scanned, or "0-0" if
the entire stream was scanned.
- A list of the IDs for the claimed entries.
- If you are using Valkey 7.0.0 or above, the response list will also include a list containing
the message IDs that were in the Pending Entries List but no longer exist in the stream.
These IDs are deleted from the Pending Entries List.


#### :gear: xgroupCreate

Creates a new consumer group uniquely identified by `groupname` for the stream
stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xgroupCreate` | `(key: any, groupName: any, id: string, options?: StreamGroupOptions or undefined) => T` |

Parameters:

* `key`: - The key of the stream.
* `groupName`: - The newly created consumer group name.
* `id`: - Stream entry ID that specifies the last delivered entry in the stream from the new
group’s perspective. The special ID `"$"` can be used to specify the last entry in the stream.

Command Response - `"OK"`.


#### :gear: xgroupDestroy

Destroys the consumer group `groupname` for the stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xgroupDestroy` | `(key: any, groupName: any) => T` |

Parameters:

* `key`: - The key of the stream.
* `groupname`: - The newly created consumer group name.

Command Response - `true` if the consumer group is destroyed. Otherwise, `false`.


#### :gear: xgroupCreateConsumer

Creates a consumer named `consumerName` in the consumer group `groupName` for the stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xgroupCreateConsumer` | `(key: any, groupName: any, consumerName: any) => T` |

Parameters:

* `key`: - The key of the stream.
* `groupName`: - The consumer group name.
* `consumerName`: - The newly created consumer.

Command Response - `true` if the consumer is created. Otherwise, returns `false`.


#### :gear: xgroupDelConsumer

Deletes a consumer named `consumerName` in the consumer group `groupName` for the stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xgroupDelConsumer` | `(key: any, groupName: any, consumerName: any) => T` |

Parameters:

* `key`: - The key of the stream.
* `groupName`: - The consumer group name.
* `consumerName`: - The consumer to delete.

Command Response - The number of pending messages the `consumer` had before it was deleted.


#### :gear: xack

Returns the number of messages that were successfully acknowledged by the consumer group member of a stream.
This command should be called on a pending message so that such message does not get processed again.

| Method | Type |
| ---------- | ---------- |
| `xack` | `(key: any, group: any, ids: string[]) => T` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.
* `ids`: - An array of entry ids.

Command Response - The number of messages that were successfully acknowledged.


#### :gear: xgroupSetId

Sets the last delivered ID for a consumer group.

| Method | Type |
| ---------- | ---------- |
| `xgroupSetId` | `(key: any, groupName: any, id: string, options?: { entriesRead?: number or undefined; } or undefined) => T` |

Parameters:

* `key`: - The key of the stream.
* `groupName`: - The consumer group name.
* `id`: - The stream entry ID that should be set as the last delivered ID for the consumer group.
* `options`: - (Optional) Additional parameters:
- (Optional) `entriesRead`: the number of stream entries already read by the group.
This option can only be specified if you are using Valkey version 7.0.0 or above.

Command Response - `"OK"`.


#### :gear: rename

Renames `key` to `newkey`.
If `newkey` already exists it is overwritten.

| Method | Type |
| ---------- | ---------- |
| `rename` | `(key: any, newKey: any) => T` |

Parameters:

* `key`: - The key to rename.
* `newKey`: - The new name of the key.

Command Response - If the `key` was successfully renamed, return "OK". If `key` does not exist, an error is thrown.


#### :gear: renamenx

Renames `key` to `newkey` if `newkey` does not yet exist.

| Method | Type |
| ---------- | ---------- |
| `renamenx` | `(key: any, newKey: any) => T` |

Parameters:

* `key`: - The key to rename.
* `newKey`: - The new name of the key.

Command Response - If the `key` was successfully renamed, returns `true`. Otherwise, returns `false`.
If `key` does not exist, an error is thrown.


#### :gear: brpop

Blocking list pop primitive.
Pop an element from the tail of the first list that is non-empty,
with the given `keys` being checked in the order that they are given.
Blocks the connection when there are no elements to pop from any of the given lists.

| Method | Type |
| ---------- | ---------- |
| `brpop` | `(keys: any[], timeout: number) => T` |

Parameters:

* `keys`: - The `keys` of the lists to pop from.
* `timeout`: - The `timeout` in seconds.

Command Response - An `array` containing the `key` from which the element was popped and the value of the popped element,
formatted as [key, value]. If no element could be popped and the timeout expired, returns `null`.


#### :gear: blpop

Blocking list pop primitive.
Pop an element from the head of the first list that is non-empty,
with the given `keys` being checked in the order that they are given.
Blocks the connection when there are no elements to pop from any of the given lists.

| Method | Type |
| ---------- | ---------- |
| `blpop` | `(keys: any[], timeout: number) => T` |

Parameters:

* `keys`: - The `keys` of the lists to pop from.
* `timeout`: - The `timeout` in seconds.

Command Response - An `array` containing the `key` from which the element was popped and the value of the popped element,
formatted as [key, value]. If no element could be popped and the timeout expired, returns `null`.


#### :gear: pfadd

Adds all elements to the HyperLogLog data structure stored at the specified `key`.
Creates a new structure if the `key` does not exist.
When no elements are provided, and `key` exists and is a HyperLogLog, then no operation is performed.

| Method | Type |
| ---------- | ---------- |
| `pfadd` | `(key: any, elements: any[]) => T` |

Parameters:

* `key`: - The key of the HyperLogLog data structure to add elements into.
* `elements`: - An array of members to add to the HyperLogLog stored at `key`.
Command Response - If the HyperLogLog is newly created, or if the HyperLogLog approximated cardinality is
altered, then returns `1`. Otherwise, returns `0`.


#### :gear: pfcount

Estimates the cardinality of the data stored in a HyperLogLog structure for a single key or
calculates the combined cardinality of multiple keys by merging their HyperLogLogs temporarily.

| Method | Type |
| ---------- | ---------- |
| `pfcount` | `(keys: any[]) => T` |

Parameters:

* `keys`: - The keys of the HyperLogLog data structures to be analyzed.
Command Response - The approximated cardinality of given HyperLogLog data structures.
The cardinality of a key that does not exist is `0`.


#### :gear: pfmerge

Merges multiple HyperLogLog values into a unique value. If the destination variable exists, it is
treated as one of the source HyperLogLog data sets, otherwise a new HyperLogLog is created.

| Method | Type |
| ---------- | ---------- |
| `pfmerge` | `(destination: any, sourceKeys: any[]) => T` |

Parameters:

* `destination`: - The key of the destination HyperLogLog where the merged data sets will be stored.
* `sourceKeys`: - The keys of the HyperLogLog structures to be merged.
Command Response - A simple "OK" response.


#### :gear: objectEncoding

Returns the internal encoding for the Valkey object stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `objectEncoding` | `(key: any) => T` |

Parameters:

* `key`: - The `key` of the object to get the internal encoding of.

Command Response - If `key` exists, returns the internal encoding of the object stored at `key` as a string.
Otherwise, returns None.


#### :gear: objectFreq

Returns the logarithmic access frequency counter of a Valkey object stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `objectFreq` | `(key: any) => T` |

Parameters:

* `key`: - The `key` of the object to get the logarithmic access frequency counter of.

Command Response - If `key` exists, returns the logarithmic access frequency counter of
the object stored at `key` as a `number`. Otherwise, returns `null`.


#### :gear: objectIdletime

Returns the time in seconds since the last access to the value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `objectIdletime` | `(key: any) => T` |

Parameters:

* `key`: - The key of the object to get the idle time of.

Command Response - If `key` exists, returns the idle time in seconds. Otherwise, returns `null`.


#### :gear: objectRefcount

Returns the reference count of the object stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `objectRefcount` | `(key: any) => T` |

Parameters:

* `key`: - The `key` of the object to get the reference count of.

Command Response - If `key` exists, returns the reference count of the object stored at `key` as a `number`.
Otherwise, returns `null`.


#### :gear: lolwut

Displays a piece of generative computer art and the server version.

| Method | Type |
| ---------- | ---------- |
| `lolwut` | `(options?: LolwutOptions or undefined) => T` |

Parameters:

* `options`: - (Optional) The LOLWUT options - see 


#### :gear: wait

Blocks the current client until all the previous write commands are successfully transferred and
acknowledged by at least `numreplicas` of replicas. If `timeout` is reached, the command returns
the number of replicas that were not yet reached.

| Method | Type |
| ---------- | ---------- |
| `wait` | `(numreplicas: number, timeout: number) => T` |

Parameters:

* `numreplicas`: - The number of replicas to reach.
* `timeout`: - The timeout value specified in milliseconds. A value of 0 will block indefinitely.

Command Response - The number of replicas reached by all the writes performed in the context of the
current connection.


#### :gear: fcall

Invokes a previously loaded function.

| Method | Type |
| ---------- | ---------- |
| `fcall` | `(func: any, keys: any[], args: any[]) => T` |

Parameters:

* `func`: - The function name.
* `keys`: - A list of `keys` accessed by the function. To ensure the correct execution of functions,
all names of keys that a function accesses must be explicitly provided as `keys`.
* `args`: - A list of `function` arguments and it should not represent names of keys.

Command Response - The invoked function's return value.


#### :gear: fcallReadonly

Invokes a previously loaded read-only function.

| Method | Type |
| ---------- | ---------- |
| `fcallReadonly` | `(func: any, keys: any[], args: any[]) => T` |

Parameters:

* `func`: - The function name.
* `keys`: - A list of `keys` accessed by the function. To ensure the correct execution of functions,
all names of keys that a function accesses must be explicitly provided as `keys`.
* `args`: - A list of `function` arguments and it should not represent names of keys.

Command Response - The invoked function's return value.


#### :gear: functionDelete

Deletes a library and all its functions.

| Method | Type |
| ---------- | ---------- |
| `functionDelete` | `(libraryCode: any) => T` |

Parameters:

* `libraryCode`: - The library name to delete.

Command Response - `"OK"`.


#### :gear: functionLoad

Loads a library to Valkey.

| Method | Type |
| ---------- | ---------- |
| `functionLoad` | `(libraryCode: any, replace?: boolean or undefined) => T` |

Parameters:

* `libraryCode`: - The source code that implements the library.
* `replace`: - (Optional) Whether the given library should overwrite a library with the same name if it
already exists.

Command Response - The library name that was loaded.


#### :gear: functionFlush

Deletes all function libraries.

| Method | Type |
| ---------- | ---------- |
| `functionFlush` | `(mode?: FlushMode or undefined) => T` |

Parameters:

* `mode`: - (Optional) The flushing mode, could be either 


#### :gear: functionList

Returns information about the functions and libraries.

| Method | Type |
| ---------- | ---------- |
| `functionList` | `(options?: FunctionListOptions or undefined) => T` |

Parameters:

* `options`: - (Optional) Parameters to filter and request additional info.

Command Response - Info about all or selected libraries and their functions in 


#### :gear: functionStats

Returns information about the function that's currently running and information about the
available execution engines.

| Method | Type |
| ---------- | ---------- |
| `functionStats` | `() => T` |

#### :gear: functionDump

Returns the serialized payload of all loaded libraries.

| Method | Type |
| ---------- | ---------- |
| `functionDump` | `() => T` |

#### :gear: functionRestore

Restores libraries from the serialized payload returned by {@link functionDump}.

| Method | Type |
| ---------- | ---------- |
| `functionRestore` | `(payload: Buffer, policy?: FunctionRestorePolicy or undefined) => T` |

Parameters:

* `payload`: - The serialized data from 
* `policy`: - (Optional) A policy for handling existing libraries.

Command Response - `"OK"`.


#### :gear: flushall

Deletes all the keys of all the existing databases. This command never fails.

| Method | Type |
| ---------- | ---------- |
| `flushall` | `(mode?: FlushMode or undefined) => T` |

Parameters:

* `mode`: - (Optional) The flushing mode, could be either 


#### :gear: flushdb

Deletes all the keys of the currently selected database. This command never fails.

| Method | Type |
| ---------- | ---------- |
| `flushdb` | `(mode?: FlushMode or undefined) => T` |

Parameters:

* `mode`: - (Optional) The flushing mode, could be either 


#### :gear: lpos

Returns the index of the first occurrence of `element` inside the list specified by `key`. If no
match is found, `null` is returned. If the `count` option is specified, then the function returns
an `array` of indices of matching elements within the list.

| Method | Type |
| ---------- | ---------- |
| `lpos` | `(key: any, element: any, options?: LPosOptions or undefined) => T` |

Parameters:

* `key`: - The name of the list.
* `element`: - The value to search for within the list.
* `options`: - (Optional) The LPOS options - see 


#### :gear: dbsize

Returns the number of keys in the currently selected database.

| Method | Type |
| ---------- | ---------- |
| `dbsize` | `() => T` |

#### :gear: bitcount

Counts the number of set bits (population counting) in the string stored at `key`. The `options` argument can
optionally be provided to count the number of bits in a specific string interval.

| Method | Type |
| ---------- | ---------- |
| `bitcount` | `(key: any, options?: BitOffsetOptions or undefined) => T` |

Parameters:

* `key`: - The key for the string to count the set bits of.
* `options`: - The offset options - see 


#### :gear: geoadd

Adds geospatial members with their positions to the specified sorted set stored at `key`.
If a member is already a part of the sorted set, its position is updated.

| Method | Type |
| ---------- | ---------- |
| `geoadd` | `(key: any, membersToGeospatialData: Map<any, GeospatialData>, options?: GeoAddOptions or undefined) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `membersToGeospatialData`: - A mapping of member names to their corresponding positions - see

* `options`: - The GeoAdd options - see 


#### :gear: geosearch

Returns the members of a sorted set populated with geospatial information using {@link geoadd},
which are within the borders of the area specified by a given shape.

| Method | Type |
| ---------- | ---------- |
| `geosearch` | `(key: any, searchFrom: SearchOrigin, searchBy: GeoSearchShape, resultOptions?: GeoSearchResultOptions or undefined) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `searchFrom`: - The query's center point options, could be one of:

- 
* `searchBy`: - The query's shape options, could be one of:

- 
* `resultOptions`: - The optional inputs to request additional information and configure sorting/limiting the results, see 


#### :gear: geosearchstore

Searches for members in a sorted set stored at `source` representing geospatial data
within a circular or rectangular area and stores the result in `destination`.

If `destination` already exists, it is overwritten. Otherwise, a new sorted set will be created.

To get the result directly, see {@link geosearch}.

| Method | Type |
| ---------- | ---------- |
| `geosearchstore` | `(destination: any, source: any, searchFrom: SearchOrigin, searchBy: GeoSearchShape, resultOptions?: GeoSearchStoreResultOptions or undefined) => T` |

Parameters:

* `destination`: - The key of the destination sorted set.
* `source`: - The key of the sorted set.
* `searchFrom`: - The query's center point options, could be one of:
- 
* `searchBy`: - The query's shape options, could be one of:
- 
* `resultOptions`: - (Optional) Parameters to request additional information and configure sorting/limiting the results, see 


#### :gear: geopos

Returns the positions (longitude, latitude) of all the specified `members` of the
geospatial index represented by the sorted set at `key`.

| Method | Type |
| ---------- | ---------- |
| `geopos` | `(key: any, members: any[]) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `members`: - The members for which to get the positions.

Command Response - A 2D `Array` which represents positions (longitude and latitude) corresponding to the
given members. The order of the returned positions matches the order of the input members.
If a member does not exist, its position will be `null`.


#### :gear: zmpop

Pops member-score pairs from the first non-empty sorted set, with the given `keys`
being checked in the order they are provided.

| Method | Type |
| ---------- | ---------- |
| `zmpop` | `(keys: any[], modifier: ScoreFilter, count?: number or undefined) => T` |

Parameters:

* `keys`: - The keys of the sorted sets.
* `modifier`: - The element pop criteria - either 
* `count`: - (Optional) The number of elements to pop. If not supplied, only one element will be popped.

Command Response - A two-element `array` containing the key name of the set from which the
was popped, and a `GlideRecord<number>` of the popped elements - see 


#### :gear: bzmpop

Pops a member-score pair from the first non-empty sorted set, with the given `keys` being
checked in the order they are provided. Blocks the connection when there are no members
to pop from any of the given sorted sets. `BZMPOP` is the blocking variant of {@link zmpop}.

| Method | Type |
| ---------- | ---------- |
| `bzmpop` | `(keys: any[], modifier: ScoreFilter, timeout: number, count?: number or undefined) => T` |

Parameters:

* `keys`: - The keys of the sorted sets.
* `modifier`: - The element pop criteria - either 
* `timeout`: - The number of seconds to wait for a blocking operation to complete. A value of `0` will block indefinitely.
* `count`: - (Optional) The number of elements to pop. If not supplied, only one element will be popped.

Command Response - A two-element `array` containing the key name of the set from which the element
was popped, and a `GlideRecord<number>` of the popped elements - see 


#### :gear: zincrby

Increments the score of `member` in the sorted set stored at `key` by `increment`.
If `member` does not exist in the sorted set, it is added with `increment` as its score.
If `key` does not exist, a new sorted set is created with the specified member as its sole member.

| Method | Type |
| ---------- | ---------- |
| `zincrby` | `(key: any, increment: number, member: any) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `increment`: - The score increment.
* `member`: - A member of the sorted set.

Command Response - The new score of `member`.


#### :gear: zscan

Iterates incrementally over a sorted set.

| Method | Type |
| ---------- | ---------- |
| `zscan` | `(key: any, cursor: string, options?: ZScanOptions or undefined) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `cursor`: - The cursor that points to the next iteration of results. A value of `"0"` indicates the start of
the search.
* `options`: - (Optional) The `zscan` options - see 


#### :gear: geodist

Returns the distance between `member1` and `member2` saved in the geospatial index stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `geodist` | `(key: any, member1: any, member2: any, options?: { unit?: GeoUnit or undefined; } or undefined) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `member1`: - The name of the first member.
* `member2`: - The name of the second member.
* `options`: - (Optional) Additional parameters:
- (Optional) `unit`: the unit of distance measurement - see 


#### :gear: geohash

Returns the `GeoHash` strings representing the positions of all the specified `members` in the sorted set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `geohash` | `(key: any, members: any[]) => T` |

Parameters:

* `key`: - The key of the sorted set.
* `members`: - The array of members whose `GeoHash` strings are to be retrieved.

Command Response - An array of `GeoHash` strings representing the positions of the specified members stored at `key`.
If a member does not exist in the sorted set, a `null` value is returned for that member.


#### :gear: lastsave

Returns `UNIX TIME` of the last DB save timestamp or startup timestamp if no save
was made since then.

| Method | Type |
| ---------- | ---------- |
| `lastsave` | `() => T` |

#### :gear: lcs

Returns all the longest common subsequences combined between strings stored at `key1` and `key2`.

| Method | Type |
| ---------- | ---------- |
| `lcs` | `(key1: any, key2: any) => T` |

Parameters:

* `key1`: - The key that stores the first string.
* `key2`: - The key that stores the second string.

Command Response - A `String` containing all the longest common subsequence combined between the 2 strings.
An empty `String` is returned if the keys do not exist or have no common subsequences.


#### :gear: lcsLen

Returns the total length of all the longest common subsequences between strings stored at `key1` and `key2`.

| Method | Type |
| ---------- | ---------- |
| `lcsLen` | `(key1: any, key2: any) => T` |

Parameters:

* `key1`: - The key that stores the first string.
* `key2`: - The key that stores the second string.

Command Response - The total length of all the longest common subsequences between the 2 strings.


#### :gear: lcsIdx

Returns the indices and lengths of the longest common subsequences between strings stored at
`key1` and `key2`.

| Method | Type |
| ---------- | ---------- |
| `lcsIdx` | `(key1: any, key2: any, options?: { withMatchLen?: boolean or undefined; minMatchLen?: number or undefined; } or undefined) => T` |

Parameters:

* `key1`: - The key that stores the first string.
* `key2`: - The key that stores the second string.
* `options`: - (Optional) Additional parameters:
- (Optional) `withMatchLen`: if `true`, include the length of the substring matched for the each match.
- (Optional) `minMatchLen`: the minimum length of matches to include in the result.

Command Response - A 


#### :gear: touch

Updates the last access time of the specified keys.

| Method | Type |
| ---------- | ---------- |
| `touch` | `(keys: any[]) => T` |

Parameters:

* `keys`: - The keys to update the last access time of.

Command Response - The number of keys that were updated. A key is ignored if it doesn't exist.


#### :gear: randomKey

Returns a random existing key name from the currently selected database.

| Method | Type |
| ---------- | ---------- |
| `randomKey` | `() => T` |

#### :gear: setrange

Overwrites part of the string stored at `key`, starting at the specified byte `offset`,
for the entire length of `value`. If the `offset` is larger than the current length of the string at `key`,
the string is padded with zero bytes to make `offset` fit. Creates the `key` if it doesn't exist.

| Method | Type |
| ---------- | ---------- |
| `setrange` | `(key: any, offset: number, value: any) => T` |

Parameters:

* `key`: - The key of the string to update.
* `offset`: - The byte position in the string where `value` should be written.
* `value`: - The string written with `offset`.

Command Response - The length of the string stored at `key` after it was modified.


#### :gear: append

Appends a `value` to a `key`. If `key` does not exist it is created and set as an empty string,
so `APPEND` will be similar to {@link set} in this special case.

| Method | Type |
| ---------- | ---------- |
| `append` | `(key: any, value: any) => T` |

Parameters:

* `key`: - The key of the string.
* `value`: - The key of the string.

Command Response - The length of the string after appending the value.


#### :gear: lmpop

Pops one or more elements from the first non-empty list from the provided `keys`.

| Method | Type |
| ---------- | ---------- |
| `lmpop` | `(keys: any[], direction: ListDirection, count?: number or undefined) => T` |

Parameters:

* `keys`: - An array of keys to lists.
* `direction`: - The direction based on which elements are popped from - see 
* `count`: - (Optional) The maximum number of popped elements.

Command Response - A `Record` which stores the key name where elements were popped out and the array of popped elements.


#### :gear: blmpop

Blocks the connection until it pops one or more elements from the first non-empty list from the
provided `key`. `BLMPOP` is the blocking variant of {@link lmpop}.

| Method | Type |
| ---------- | ---------- |
| `blmpop` | `(keys: any[], direction: ListDirection, timeout: number, count?: number or undefined) => T` |

Parameters:

* `keys`: - An array of keys to lists.
* `direction`: - The direction based on which elements are popped from - see 
* `timeout`: - The number of seconds to wait for a blocking operation to complete. A value of
`0` will block indefinitely.
* `count`: - (Optional) The maximum number of popped elements.

Command Response - A `Record` which stores the key name where elements were popped out and the array of popped elements.
If no member could be popped and the timeout expired, returns `null`.


#### :gear: pubsubChannels

Lists the currently active channels.
The command is routed to all nodes, and aggregates the response to a single array.

| Method | Type |
| ---------- | ---------- |
| `pubsubChannels` | `(pattern?: any) => T` |

Parameters:

* `pattern`: - A glob-style pattern to match active channels.
  If not provided, all active channels are returned.
Command Response - A list of currently active channels matching the given pattern.
If no pattern is specified, all active channels are returned.


#### :gear: pubsubNumPat

Returns the number of unique patterns that are subscribed to by clients.

Note: This is the total number of unique patterns all the clients are subscribed to,
not the count of clients subscribed to patterns.
The command is routed to all nodes, and aggregates the response to the sum of all pattern subscriptions.

| Method | Type |
| ---------- | ---------- |
| `pubsubNumPat` | `() => T` |

#### :gear: pubsubNumSub

Returns the number of subscribers (exclusive of clients subscribed to patterns) for the specified channels.

| Method | Type |
| ---------- | ---------- |
| `pubsubNumSub` | `(channels: any[]) => T` |

Parameters:

* `channels`: - The list of channels to query for the number of subscribers.

Command Response - A list of the channel names and their numbers of subscribers.


#### :gear: sort

Sorts the elements in the list, set, or sorted set at `key` and returns the result.

The `sort` command can be used to sort elements based on different criteria and
apply transformations on sorted elements.

To store the result into a new key, see {@link sortStore}.

| Method | Type |
| ---------- | ---------- |
| `sort` | `(key: any, options?: SortOptions or undefined) => T` |

Parameters:

* `key`: - The key of the list, set, or sorted set to be sorted.
* `options`: - (Optional) 


#### :gear: sortReadOnly

Sorts the elements in the list, set, or sorted set at `key` and returns the result.

The `sortReadOnly` command can be used to sort elements based on different criteria and
apply transformations on sorted elements.

This command is routed depending on the client's {@link ReadFrom} strategy.

| Method | Type |
| ---------- | ---------- |
| `sortReadOnly` | `(key: any, options?: SortOptions or undefined) => T` |

Parameters:

* `key`: - The key of the list, set, or sorted set to be sorted.
* `options`: - (Optional) 


#### :gear: sortStore

Sorts the elements in the list, set, or sorted set at `key` and stores the result in
`destination`.

The `sort` command can be used to sort elements based on different criteria and
apply transformations on sorted elements, and store the result in a new key.

To get the sort result without storing it into a key, see {@link sort} or {@link sortReadOnly}.

| Method | Type |
| ---------- | ---------- |
| `sortStore` | `(key: any, destination: any, options?: SortOptions or undefined) => T` |

Parameters:

* `key`: - The key of the list, set, or sorted set to be sorted.
* `destination`: - The key where the sorted result will be stored.
* `options`: - (Optional) 


## :factory: Transaction

Extends BaseTransaction class for Valkey standalone commands.
Transactions allow the execution of a group of commands in a single step.

Command Response:
 An array of command responses is returned by the GlideClient.exec command, in the order they were given.
 Each element in the array represents a command given to the transaction.
 The response for each command depends on the executed Valkey command.
 Specific response types are documented alongside each method.

### Methods

- [select](#gear-select)
- [copy](#gear-copy)
- [move](#gear-move)
- [publish](#gear-publish)

#### :gear: select

Change the currently selected database.

| Method | Type |
| ---------- | ---------- |
| `select` | `(index: number) => Transaction` |

Parameters:

* `index`: - The index of the database to select.

Command Response - A simple `"OK"` response.


#### :gear: copy

Copies the value stored at the `source` to the `destination` key. If `destinationDB` is specified,
the value will be copied to the database specified, otherwise the current database will be used.
When `replace` is true, removes the `destination` key first if it already exists, otherwise performs
no action.

| Method | Type |
| ---------- | ---------- |
| `copy` | `(source: any, destination: any, options?: { destinationDB?: number or undefined; replace?: boolean or undefined; } or undefined) => Transaction` |

Parameters:

* `source`: - The key to the source value.
* `destination`: - The key where the value should be copied to.
* `destinationDB`: - (Optional) The alternative logical database index for the destination key.
If not provided, the current database will be used.
* `replace`: - (Optional) If `true`, the `destination` key should be removed before copying the
value to it. If not provided, no action will be performed if the key already exists.

Command Response - `true` if `source` was copied, `false` if the `source` was not copied.


#### :gear: move

Move `key` from the currently selected database to the database specified by `dbIndex`.

| Method | Type |
| ---------- | ---------- |
| `move` | `(key: any, dbIndex: number) => Transaction` |

Parameters:

* `key`: - The key to move.
* `dbIndex`: - The index of the database to move `key` to.

Command Response - `true` if `key` was moved, or `false` if the `key` already exists in the destination
database or does not exist in the source database.


#### :gear: publish

Publish a message on pubsub channel.

| Method | Type |
| ---------- | ---------- |
| `publish` | `(message: any, channel: any) => Transaction` |

Parameters:

* `message`: - Message to publish.
* `channel`: - Channel to publish the message on.

Command Response -  Number of subscriptions in primary node that received the message.
Note that this value does not include subscriptions that configured on replicas.


## :factory: ClusterTransaction

Extends BaseTransaction class for cluster mode commands.
Transactions allow the execution of a group of commands in a single step.

Command Response:
 An array of command responses is returned by the GlideClusterClient.exec command, in the order they were given.
 Each element in the array represents a command given to the transaction.
 The response for each command depends on the executed Valkey command.
 Specific response types are documented alongside each method.

### Methods

- [copy](#gear-copy)
- [publish](#gear-publish)
- [pubsubShardChannels](#gear-pubsubshardchannels)
- [pubsubShardNumSub](#gear-pubsubshardnumsub)

#### :gear: copy

Copies the value stored at the `source` to the `destination` key. When `replace` is true,
removes the `destination` key first if it already exists, otherwise performs no action.

| Method | Type |
| ---------- | ---------- |
| `copy` | `(source: any, destination: any, options?: { replace?: boolean or undefined; } or undefined) => ClusterTransaction` |

Parameters:

* `source`: - The key to the source value.
* `destination`: - The key where the value should be copied to.
* `replace`: - (Optional) If `true`, the `destination` key should be removed before copying the
value to it. If not provided, no action will be performed if the key already exists.

Command Response - `true` if `source` was copied, `false` if the `source` was not copied.


#### :gear: publish

Publish a message on pubsub channel.
This command aggregates PUBLISH and SPUBLISH commands functionalities.
The mode is selected using the 'sharded' parameter.
For both sharded and non-sharded mode, request is routed using hashed channel as key.

| Method | Type |
| ---------- | ---------- |
| `publish` | `(message: any, channel: any, sharded?: boolean) => ClusterTransaction` |

Parameters:

* `message`: - Message to publish.
* `channel`: - Channel to publish the message on.
* `sharded`: - Use sharded pubsub mode. Available since Valkey version 7.0.

Command Response -  Number of subscriptions in primary node that received the message.


#### :gear: pubsubShardChannels

Lists the currently active shard channels.
The command is routed to all nodes, and aggregates the response to a single array.

| Method | Type |
| ---------- | ---------- |
| `pubsubShardChannels` | `(pattern?: any) => ClusterTransaction` |

Parameters:

* `pattern`: - A glob-style pattern to match active shard channels.
  If not provided, all active shard channels are returned.

Command Response - A list of currently active shard channels matching the given pattern.
If no pattern is specified, all active shard channels are returned.


#### :gear: pubsubShardNumSub

Returns the number of subscribers (exclusive of clients subscribed to patterns) for the specified shard channels.

| Method | Type |
| ---------- | ---------- |
| `pubsubShardNumSub` | `(channels: any[]) => ClusterTransaction` |

Parameters:

* `channels`: - The list of shard channels to query for the number of subscribers.

Command Response - A list of the shard channel names and their numbers of subscribers.


## :factory: GlideClient

Client used for connection to standalone servers.

### Methods

- [createClient](#gear-createclient)
- [exec](#gear-exec)
- [customCommand](#gear-customcommand)
- [ping](#gear-ping)
- [info](#gear-info)
- [select](#gear-select)
- [clientGetName](#gear-clientgetname)
- [configRewrite](#gear-configrewrite)
- [configResetStat](#gear-configresetstat)
- [clientId](#gear-clientid)
- [configGet](#gear-configget)
- [configSet](#gear-configset)
- [echo](#gear-echo)
- [time](#gear-time)
- [copy](#gear-copy)
- [move](#gear-move)
- [lolwut](#gear-lolwut)
- [functionDelete](#gear-functiondelete)
- [functionLoad](#gear-functionload)
- [functionFlush](#gear-functionflush)
- [functionList](#gear-functionlist)
- [functionStats](#gear-functionstats)
- [functionKill](#gear-functionkill)
- [functionDump](#gear-functiondump)
- [functionRestore](#gear-functionrestore)
- [flushall](#gear-flushall)
- [flushdb](#gear-flushdb)
- [dbsize](#gear-dbsize)
- [publish](#gear-publish)
- [lastsave](#gear-lastsave)
- [randomKey](#gear-randomkey)
- [unwatch](#gear-unwatch)
- [scriptExists](#gear-scriptexists)
- [scriptFlush](#gear-scriptflush)
- [scriptKill](#gear-scriptkill)
- [scan](#gear-scan)

#### :gear: createClient

Creates a new `GlideClient` instance and establishes a connection to a standalone Valkey Glide server.

| Method | Type |
| ---------- | ---------- |
| `createClient` | `(options: GlideClientConfiguration) => Promise<GlideClient>` |

Parameters:

* `options`: - The configuration options for the client, including server addresses, authentication credentials, TLS settings, database selection, reconnection strategy, and Pub/Sub subscriptions.


Examples:

```typescript
// Connecting to a Standalone Server
import { GlideClient, GlideClientConfiguration } from '@valkey/valkey-glide';

const client = await GlideClient.createClient({
  addresses: [
    { host: 'primary.example.com', port: 6379 },
    { host: 'replica1.example.com', port: 6379 },
  ],
  databaseId: 1,
  credentials: {
    username: 'user1',
    password: 'passwordA',
  },
  useTLS: true,
  connectionBackoff: {
    numberOfRetries: 5,
    factor: 1000,
    exponentBase: 2,
  },
  pubsubSubscriptions: {
    channelsAndPatterns: {
      [GlideClientConfiguration.PubSubChannelModes.Exact]: new Set(['updates']),
    },
    callback: (msg) => {
      console.log(`Received message: ${msg.payload}`);
    },
  },
});
```


#### :gear: exec

Execute a transaction by processing the queued commands.

| Method | Type |
| ---------- | ---------- |
| `exec` | `(transaction: Transaction, options?: DecoderOption or undefined) => Promise<any[] or null>` |

Parameters:

* `transaction`: - A 
* `options`: - (Optional) See 


#### :gear: customCommand

Executes a single command, without checking inputs. Every part of the command, including subcommands,
should be added as a separate value in args.

Note: An error will occur if the string decoder is used with commands that return only bytes as a response.

| Method | Type |
| ---------- | ---------- |
| `customCommand` | `(args: any[], options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `args`: - A list including the command name and arguments for the custom command.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of customCommand method to retrieve pub/sub clients
const result = await client.customCommand(["CLIENT", "LIST", "TYPE", "PUBSUB"]);
console.log(result); // Output: Returns a list of all pub/sub clients
```


#### :gear: ping

Pings the server.

| Method | Type |
| ---------- | ---------- |
| `ping` | `(options?: ({ message?: any; } and DecoderOption) or undefined) => Promise<any>` |

Parameters:

* `options`: - (Optional) Additional parameters:
- (Optional) `message` : a message to include in the `PING` command.
+ If not provided, the server will respond with `"PONG"`.
+ If provided, the server will respond with a copy of the message.
- (Optional) `decoder`: see 


Examples:

```typescript
// Example usage of ping method without any message
const result = await client.ping();
console.log(result); // Output: 'PONG'
```
```typescript
// Example usage of ping method with a message
const result = await client.ping("Hello");
console.log(result); // Output: 'Hello'
```


#### :gear: info

Gets information and statistics about the server.

| Method | Type |
| ---------- | ---------- |
| `info` | `(sections?: InfoOptions[] or undefined) => Promise<string>` |

Parameters:

* `sections`: - (Optional) A list of 


#### :gear: select

Changes the currently selected database.

| Method | Type |
| ---------- | ---------- |
| `select` | `(index: number) => Promise<"OK">` |

Parameters:

* `index`: - The index of the database to select.


Examples:

```typescript
// Example usage of select method
const result = await client.select(2);
console.log(result); // Output: 'OK'
```


#### :gear: clientGetName

Gets the name of the primary's connection.

| Method | Type |
| ---------- | ---------- |
| `clientGetName` | `(options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of client_getname method
const result = await client.client_getname();
console.log(result); // Output: 'Client Name'
```


#### :gear: configRewrite

Rewrites the configuration file with the current configuration.

| Method | Type |
| ---------- | ---------- |
| `configRewrite` | `() => Promise<"OK">` |

Examples:

```typescript
// Example usage of configRewrite command
const result = await client.configRewrite();
console.log(result); // Output: 'OK'
```


#### :gear: configResetStat

Resets the statistics reported by the server using the `INFO` and `LATENCY HISTOGRAM` commands.

| Method | Type |
| ---------- | ---------- |
| `configResetStat` | `() => Promise<"OK">` |

Examples:

```typescript
// Example usage of configResetStat command
const result = await client.configResetStat();
console.log(result); // Output: 'OK'
```


#### :gear: clientId

Returns the current connection ID.

| Method | Type |
| ---------- | ---------- |
| `clientId` | `() => Promise<number>` |

Examples:

```typescript
const result = await client.clientId();
console.log("Connection id: " + result);
```


#### :gear: configGet

Reads the configuration parameters of the running server.

| Method | Type |
| ---------- | ---------- |
| `configGet` | `(parameters: string[], options?: DecoderOption or undefined) => Promise<Record<string, any>>` |

Parameters:

* `parameters`: - A list of configuration parameter names to retrieve values for.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of configGet method with multiple configuration parameters
const result = await client.configGet(["timeout", "maxmemory"]);
console.log(result); // Output: {'timeout': '1000', 'maxmemory': '1GB'}
```


#### :gear: configSet

Sets configuration parameters to the specified values.

| Method | Type |
| ---------- | ---------- |
| `configSet` | `(parameters: Record<string, any>) => Promise<"OK">` |

Parameters:

* `parameters`: - A map consisting of configuration parameters and their respective values to set.


Examples:

```typescript
// Example usage of configSet method to set multiple configuration parameters
const result = await client.configSet({ timeout: "1000", maxmemory, "1GB" });
console.log(result); // Output: 'OK'
```


#### :gear: echo

Echoes the provided `message` back.

| Method | Type |
| ---------- | ---------- |
| `echo` | `(message: any, options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `message`: - The message to be echoed back.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of the echo command
const echoedMessage = await client.echo("valkey-glide");
console.log(echoedMessage); // Output: 'valkey-glide'
```


#### :gear: time

Returns the server time.

| Method | Type |
| ---------- | ---------- |
| `time` | `() => Promise<[string, string]>` |

Examples:

```typescript
console.log(await client.time()); // Output: ['1710925775', '913580']
```


#### :gear: copy

Copies the value stored at the `source` to the `destination` key. If `destinationDB` is specified,
the value will be copied to the database specified, otherwise the current database will be used.
When `replace` is true, removes the `destination` key first if it already exists, otherwise performs
no action.

| Method | Type |
| ---------- | ---------- |
| `copy` | `(source: any, destination: any, options?: { destinationDB?: number or undefined; replace?: boolean or undefined; } or undefined) => Promise<boolean>` |

Parameters:

* `source`: - The key to the source value.
* `destination`: - The key where the value should be copied to.
* `options`: - (Optional) Additional parameters:
- (Optional) `destinationDB`: the alternative logical database index for the destination key.
If not provided, the current database will be used.
- (Optional) `replace`: if `true`, the `destination` key should be removed before copying the
value to it. If not provided, no action will be performed if the key already exists.


Examples:

```typescript
const result = await client.copy("set1", "set2");
console.log(result); // Output: true - "set1" was copied to "set2".
```
```typescript
const result = await client.copy("set1", "set2", { replace: true });
console.log(result); // Output: true - "set1" was copied to "set2".
```
```typescript
const result = await client.copy("set1", "set2", { destinationDB: 1, replace: false });
console.log(result); // Output: true - "set1" was copied to "set2".
```


#### :gear: move

Move `key` from the currently selected database to the database specified by `dbIndex`.

| Method | Type |
| ---------- | ---------- |
| `move` | `(key: any, dbIndex: number) => Promise<boolean>` |

Parameters:

* `key`: - The key to move.
* `dbIndex`: - The index of the database to move `key` to.


Examples:

```typescript
const result = await client.move("key", 1);
console.log(result); // Output: true
```


#### :gear: lolwut

Displays a piece of generative computer art and the server version.

| Method | Type |
| ---------- | ---------- |
| `lolwut` | `(options?: LolwutOptions or undefined) => Promise<string>` |

Parameters:

* `options`: - (Optional) The LOLWUT options - see 


Examples:

```typescript
const response = await client.lolwut({ version: 6, parameters: [40, 20] });
console.log(response); // Output: "Valkey ver. 7.2.3" - Indicates the current server version.
```


#### :gear: functionDelete

Deletes a library and all its functions.

| Method | Type |
| ---------- | ---------- |
| `functionDelete` | `(libraryCode: any) => Promise<"OK">` |

Parameters:

* `libraryCode`: - The library name to delete.


Examples:

```typescript
const result = await client.functionDelete("libName");
console.log(result); // Output: 'OK'
```


#### :gear: functionLoad

Loads a library to Valkey.

| Method | Type |
| ---------- | ---------- |
| `functionLoad` | `(libraryCode: any, options?: ({ replace?: boolean or undefined; } and DecoderOption) or undefined) => Promise<any>` |

Parameters:

* `libraryCode`: - The source code that implements the library.
* `options`: - (Optional) Additional parameters:
- (Optional) `replace`: Whether the given library should overwrite a library with the same name if it
already exists.
- (Optional) `decoder`: see 


Examples:

```typescript
const code = "#!lua name=mylib \n redis.register_function('myfunc', function(keys, args) return args[1] end)";
const result = await client.functionLoad(code, true);
console.log(result); // Output: 'mylib'
```


#### :gear: functionFlush

Deletes all function libraries.

| Method | Type |
| ---------- | ---------- |
| `functionFlush` | `(mode?: FlushMode or undefined) => Promise<"OK">` |

Parameters:

* `mode`: - (Optional) The flushing mode, could be either 


Examples:

```typescript
const result = await client.functionFlush(FlushMode.SYNC);
console.log(result); // Output: 'OK'
```


#### :gear: functionList

Returns information about the functions and libraries.

| Method | Type |
| ---------- | ---------- |
| `functionList` | `(options?: (FunctionListOptions and DecoderOption) or undefined) => Promise<FunctionListResponse>` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
// Request info for specific library including the source code
const result1 = await client.functionList({ libNamePattern: "myLib*", withCode: true });
// Request info for all libraries
const result2 = await client.functionList();
console.log(result2); // Output:
// [{
//     "library_name": "myLib5_backup",
//     "engine": "LUA",
//     "functions": [{
//         "name": "myfunc",
//         "description": null,
//         "flags": [ "no-writes" ],
//     }],
//     "library_code": "#!lua name=myLib5_backup \n redis.register_function('myfunc', function(keys, args) return args[1] end)"
// }]
```


#### :gear: functionStats

Returns information about the function that's currently running and information about the
available execution engines.

FUNCTION STATS runs on all nodes of the server, including primary and replicas.
The response includes a mapping from node address to the command response for that node.

| Method | Type |
| ---------- | ---------- |
| `functionStats` | `(options?: DecoderOption or undefined) => Promise<FunctionStatsFullResponse>` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
const response = await client.functionStats();
console.log(response); // Example output:
// {
//     "127.0.0.1:6379": {                // Response from the primary node
//         "running_script": {
//             "name": "foo",
//             "command": ["FCALL", "foo", "0", "hello"],
//             "duration_ms": 7758
//         },
//         "engines": {
//             "LUA": {
//                 "libraries_count": 1,
//                 "functions_count": 1
//             }
//         }
//     },
//     "127.0.0.1:6380": {                // Response from a replica node
//         "running_script": null,
//         "engines": {
//             "LUA": {
//                 "libraries_count": 1,
//                 "functions_count": 1
//             }
//         }
//     }
// }
```


#### :gear: functionKill

Kills a function that is currently executing.
`FUNCTION KILL` terminates read-only functions only.
`FUNCTION KILL` runs on all nodes of the server, including primary and replicas.

| Method | Type |
| ---------- | ---------- |
| `functionKill` | `() => Promise<"OK">` |

Examples:

```typescript
await client.functionKill();
```


#### :gear: functionDump

Returns the serialized payload of all loaded libraries.

| Method | Type |
| ---------- | ---------- |
| `functionDump` | `() => Promise<Buffer>` |

Examples:

```typescript
const data = await client.functionDump();
// data can be used to restore loaded functions on any Valkey instance
```


#### :gear: functionRestore

Restores libraries from the serialized payload returned by {@link functionDump}.

| Method | Type |
| ---------- | ---------- |
| `functionRestore` | `(payload: Buffer, policy?: FunctionRestorePolicy or undefined) => Promise<"OK">` |

Parameters:

* `payload`: - The serialized data from 
* `policy`: - (Optional) A policy for handling existing libraries, see 


Examples:

```typescript
await client.functionRestore(data, FunctionRestorePolicy.FLUSH);
```


#### :gear: flushall

Deletes all the keys of all the existing databases. This command never fails.

| Method | Type |
| ---------- | ---------- |
| `flushall` | `(mode?: FlushMode or undefined) => Promise<"OK">` |

Parameters:

* `mode`: - (Optional) The flushing mode, could be either 


Examples:

```typescript
const result = await client.flushall(FlushMode.SYNC);
console.log(result); // Output: 'OK'
```


#### :gear: flushdb

Deletes all the keys of the currently selected database. This command never fails.

| Method | Type |
| ---------- | ---------- |
| `flushdb` | `(mode?: FlushMode or undefined) => Promise<"OK">` |

Parameters:

* `mode`: - (Optional) The flushing mode, could be either 


Examples:

```typescript
const result = await client.flushdb(FlushMode.SYNC);
console.log(result); // Output: 'OK'
```


#### :gear: dbsize

Returns the number of keys in the currently selected database.

| Method | Type |
| ---------- | ---------- |
| `dbsize` | `() => Promise<number>` |

Examples:

```typescript
const numKeys = await client.dbsize();
console.log("Number of keys in the current database: ", numKeys);
```


#### :gear: publish

Publish a message on pubsub channel.

| Method | Type |
| ---------- | ---------- |
| `publish` | `(message: any, channel: any) => Promise<number>` |

Parameters:

* `message`: - Message to publish.
* `channel`: - Channel to publish the message on.


Examples:

```typescript
// Example usage of publish command
const result = await client.publish("Hi all!", "global-channel");
console.log(result); // Output: 1 - This message was posted to 1 subscription which is configured on primary node
```


#### :gear: lastsave

Returns `UNIX TIME` of the last DB save timestamp or startup timestamp if no save
was made since then.

| Method | Type |
| ---------- | ---------- |
| `lastsave` | `() => Promise<number>` |

Examples:

```typescript
const timestamp = await client.lastsave();
console.log("Last DB save was done at " + timestamp);
```


#### :gear: randomKey

Returns a random existing key name from the currently selected database.

| Method | Type |
| ---------- | ---------- |
| `randomKey` | `(options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
const result = await client.randomKey();
console.log(result); // Output: "key12" - "key12" is a random existing key name from the currently selected database.
```


#### :gear: unwatch

Flushes all the previously watched keys for a transaction. Executing a transaction will
automatically flush all previously watched keys.

| Method | Type |
| ---------- | ---------- |
| `unwatch` | `() => Promise<"OK">` |

Examples:

```typescript
let response = await client.watch(["sampleKey"]);
console.log(response); // Output: "OK"
response = await client.unwatch();
console.log(response); // Output: "OK"
```


#### :gear: scriptExists

Checks existence of scripts in the script cache by their SHA1 digest.

| Method | Type |
| ---------- | ---------- |
| `scriptExists` | `(sha1s: any[]) => Promise<boolean[]>` |

Parameters:

* `sha1s`: - List of SHA1 digests of the scripts to check.


Examples:

```typescript
console result = await client.scriptExists(["sha1_digest1", "sha1_digest2"]);
console.log(result); // Output: [true, false]
```


#### :gear: scriptFlush

Flushes the Lua scripts cache.

| Method | Type |
| ---------- | ---------- |
| `scriptFlush` | `(mode?: FlushMode or undefined) => Promise<"OK">` |

Parameters:

* `mode`: - (Optional) The flushing mode, could be either 


Examples:

```typescript
console result = await client.scriptFlush(FlushMode.SYNC);
console.log(result); // Output: "OK"
```


#### :gear: scriptKill

Kills the currently executing Lua script, assuming no write operation was yet performed by the script.

| Method | Type |
| ---------- | ---------- |
| `scriptKill` | `() => Promise<"OK">` |

Examples:

```typescript
console result = await client.scriptKill();
console.log(result); // Output: "OK"
```


#### :gear: scan

Incrementally iterate over a collection of keys.
`SCAN` is a cursor based iterator. This means that at every call of the method,
the server returns an updated cursor that the user needs to use as the cursor argument in the next call.
An iteration starts when the cursor is set to "0", and terminates when the cursor returned by the server is "0".

A full iteration always retrieves all the elements that were present
in the collection from the start to the end of a full iteration.
Elements that were not constantly present in the collection during a full iteration, may be returned or not.

| Method | Type |
| ---------- | ---------- |
| `scan` | `(cursor: any, options?: (ScanOptions and DecoderOption) or undefined) => Promise<[any, any[]]>` |

Parameters:

* `cursor`: - The `cursor` used for iteration. For the first iteration, the cursor should be set to "0".
Using a non-zero cursor in the first iteration,
or an invalid cursor at any iteration, will lead to undefined results.
Using the same cursor in multiple iterations will, in case nothing changed between the iterations,
return the same elements multiple times.
If the the db has changed, it may result in undefined behavior.
* `options`: - (Optional) The options to use for the scan operation, see 


Examples:

```typescript
// Example usage of scan method
let result = await client.scan('0');
console.log(result); // Output: ['17', ['key1', 'key2', 'key3', 'key4', 'key5', 'set1', 'set2', 'set3']]
let firstCursorResult = result[0];
result = await client.scan(firstCursorResult);
console.log(result); // Output: ['349', ['key4', 'key5', 'set1', 'hash1', 'zset1', 'list1', 'list2',
// 'list3', 'zset2', 'zset3', 'zset4', 'zset5', 'zset6']]
result = await client.scan(result[0]);
console.log(result); // Output: ['0', ['key6', 'key7']]

result = await client.scan(firstCursorResult, {match: 'key*', count: 2});
console.log(result); // Output: ['6', ['key4', 'key5']]

result = await client.scan("0", {type: ObjectType.Set});
console.log(result); // Output: ['362', ['set1', 'set2', 'set3']]
```


## :factory: GlideClusterClient

Client used for connection to cluster servers.

### Methods

- [createClient](#gear-createclient)
- [scan](#gear-scan)
- [customCommand](#gear-customcommand)
- [exec](#gear-exec)
- [ping](#gear-ping)
- [info](#gear-info)
- [clientGetName](#gear-clientgetname)
- [configRewrite](#gear-configrewrite)
- [configResetStat](#gear-configresetstat)
- [clientId](#gear-clientid)
- [configGet](#gear-configget)
- [configSet](#gear-configset)
- [echo](#gear-echo)
- [time](#gear-time)
- [copy](#gear-copy)
- [lolwut](#gear-lolwut)
- [fcallWithRoute](#gear-fcallwithroute)
- [fcallReadonlyWithRoute](#gear-fcallreadonlywithroute)
- [functionDelete](#gear-functiondelete)
- [functionLoad](#gear-functionload)
- [functionFlush](#gear-functionflush)
- [functionList](#gear-functionlist)
- [functionStats](#gear-functionstats)
- [functionKill](#gear-functionkill)
- [functionDump](#gear-functiondump)
- [functionRestore](#gear-functionrestore)
- [flushall](#gear-flushall)
- [flushdb](#gear-flushdb)
- [dbsize](#gear-dbsize)
- [publish](#gear-publish)
- [pubsubShardChannels](#gear-pubsubshardchannels)
- [pubsubShardNumSub](#gear-pubsubshardnumsub)
- [lastsave](#gear-lastsave)
- [randomKey](#gear-randomkey)
- [unwatch](#gear-unwatch)
- [invokeScriptWithRoute](#gear-invokescriptwithroute)
- [scriptExists](#gear-scriptexists)
- [scriptFlush](#gear-scriptflush)
- [scriptKill](#gear-scriptkill)

#### :gear: createClient

Creates a new `GlideClusterClient` instance and establishes connections to a Valkey GLIDE Cluster.

| Method | Type |
| ---------- | ---------- |
| `createClient` | `(options: GlideClusterClientConfiguration) => Promise<GlideClusterClient>` |

Parameters:

* `options`: - The configuration options for the client, including cluster addresses, authentication credentials, TLS settings, periodic checks, and Pub/Sub subscriptions.


#### :gear: scan

Incrementally iterates over the keys in the Cluster.

This command is similar to the `SCAN` command but designed for Cluster environments.
It uses a {@link ClusterScanCursor } object to manage iterations.

For each iteration, use the new cursor object to continue the scan.
Using the same cursor object for multiple iterations may result in unexpected behavior.

For more information about the Cluster Scan implementation, see
{@link https://github.com/valkey-io/valkey-glide/wiki/General-Concepts#cluster-scan Cluster Scan}.

This method can iterate over all keys in the database from the start of the scan until it ends.
The same key may be returned in multiple scan iterations.
The API does not accept `route` as it go through all slots in the cluster.

| Method | Type |
| ---------- | ---------- |
| `scan` | `(cursor: ClusterScanCursor, options?: (ClusterScanOptions and DecoderOption) or undefined) => Promise<[ClusterScanCursor, any[]]>` |

Parameters:

* `cursor`: - The cursor object that wraps the scan state.
To start a new scan, create a new empty `ClusterScanCursor` using 
* `options`: - (Optional) The scan options, see 


Examples:

```typescript
// Iterate over all keys in the cluster
await client.mset([{key: "key1", value: "value1"}, {key: "key2", value: "value2"}, {key: "key3", value: "value3"}]);
let cursor = new ClusterScanCursor();
const allKeys: GlideString[] = [];
let keys: GlideString[] = [];
while (!cursor.isFinished()) {
  [cursor, keys] = await client.scan(cursor, { count: 10 });
  allKeys.push(...keys);
}
console.log(allKeys); // ["key1", "key2", "key3"]

// Iterate over keys matching a pattern
await client.mset([{key: "key1", value: "value1"}, {key: "key2", value: "value2"}, {key: "notMyKey", value: "value3"}, {key: "somethingElse", value: "value4"}]);
let cursor = new ClusterScanCursor();
const matchedKeys: GlideString[] = [];
while (!cursor.isFinished()) {
  const [cursor, keys] = await client.scan(cursor, { match: "*key*", count: 10 });
  matchedKeys.push(...keys);
}
console.log(matchedKeys); // ["key1", "key2", "notMyKey"]

// Iterate over keys of a specific type
await client.mset([{key: "key1", value: "value1"}, {key: "key2", value: "value2"}, {key: "key3", value: "value3"}]);
await client.sadd("thisIsASet", ["value4"]);
let cursor = new ClusterScanCursor();
const stringKeys: GlideString[] = [];
while (!cursor.isFinished()) {
  const [cursor, keys] = await client.scan(cursor, { type: object.STRING });
  stringKeys.push(...keys);
}
console.log(stringKeys); // ["key1", "key2", "key3"]
```


#### :gear: customCommand

Executes a single command, without checking inputs. Every part of the command, including subcommands,
should be added as a separate value in args.
The command will be routed automatically based on the passed command's default request policy, unless `route` is provided,
in which case the client will route the command to the nodes defined by `route`.

Note: An error will occur if the string decoder is used with commands that return only bytes as a response.

| Method | Type |
| ---------- | ---------- |
| `customCommand` | `(args: any[], options?: (RouteOption and DecoderOption) or undefined) => Promise<any>` |

Parameters:

* `args`: - A list including the command name and arguments for the custom command.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of customCommand method to retrieve pub/sub clients with routing to all primary nodes
const result = await client.customCommand(["CLIENT", "LIST", "TYPE", "PUBSUB"], {route: "allPrimaries", decoder: Decoder.String});
console.log(result); // Output: Returns a list of all pub/sub clients
```


#### :gear: exec

Execute a transaction by processing the queued commands.

| Method | Type |
| ---------- | ---------- |
| `exec` | `(transaction: ClusterTransaction, options?: ({ route?: SingleNodeRoute or undefined; } and DecoderOption) or undefined) => Promise<...>` |

Parameters:

* `transaction`: - A 
* `options`: - (Optional) Additional parameters:
- (Optional) `route`: If `route` is not provided, the transaction will be routed to the slot owner of the first key found in the transaction.
If no key is found, the command will be sent to a random node.
If `route` is provided, the client will route the command to the nodes defined by `route`.
- (Optional) `decoder`: See 


#### :gear: ping

Pings the server.

The command will be routed to all primary nodes, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `ping` | `(options?: ({ message?: any; } and RouteOption and DecoderOption) or undefined) => Promise<any>` |

Parameters:

* `options`: - (Optional) Additional parameters:
- (Optional) `message` : a message to include in the `PING` command.
+ If not provided, the server will respond with `"PONG"`.
+ If provided, the server will respond with a copy of the message.
- (Optional) `route`: see 


Examples:

```typescript
// Example usage of ping method without any message
const result = await client.ping();
console.log(result); // Output: 'PONG'
```
```typescript
// Example usage of ping method with a message
const result = await client.ping("Hello");
console.log(result); // Output: 'Hello'
```


#### :gear: info

Gets information and statistics about the server.

The command will be routed to all primary nodes, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `info` | `(options?: ({ sections?: InfoOptions[] or undefined; } and RouteOption) or undefined) => Promise<ClusterResponse<string>>` |

Parameters:

* `options`: - (Optional) Additional parameters:
- (Optional) `sections`: a list of 


#### :gear: clientGetName

Gets the name of the connection to which the request is routed.

The command will be routed to a random node, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `clientGetName` | `(options?: (RouteOption and DecoderOption) or undefined) => Promise<any>` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of client_getname method
const result = await client.client_getname();
console.log(result); // Output: 'Connection Name'
```
```typescript
// Example usage of clientGetName method with routing to all nodes
const result = await client.clientGetName('allNodes');
console.log(result); // Output: {'addr': 'Connection Name', 'addr2': 'Connection Name', 'addr3': 'Connection Name'}
```


#### :gear: configRewrite

Rewrites the configuration file with the current configuration.

The command will be routed to a all nodes, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `configRewrite` | `(options?: RouteOption or undefined) => Promise<"OK">` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of configRewrite command
const result = await client.configRewrite();
console.log(result); // Output: 'OK'
```


#### :gear: configResetStat

Resets the statistics reported by the server using the `INFO` and `LATENCY HISTOGRAM` commands.

The command will be routed to all nodes, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `configResetStat` | `(options?: RouteOption or undefined) => Promise<"OK">` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of configResetStat command
const result = await client.configResetStat();
console.log(result); // Output: 'OK'
```


#### :gear: clientId

Returns the current connection ID.

The command will be routed to a random node, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `clientId` | `(options?: RouteOption or undefined) => Promise<ClusterResponse<number>>` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
const result = await client.clientId();
console.log("Connection id: " + result);
```


#### :gear: configGet

Reads the configuration parameters of the running server.

The command will be routed to a random node, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `configGet` | `(parameters: string[], options?: (RouteOption and DecoderOption) or undefined) => Promise<ClusterResponse<Record<string, any>>>` |

Parameters:

* `parameters`: - A list of configuration parameter names to retrieve values for.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of config_get method with a single configuration parameter with routing to a random node
const result = await client.config_get(["timeout"], "randomNode");
console.log(result); // Output: {'timeout': '1000'}
```
```typescript
// Example usage of configGet method with multiple configuration parameters
const result = await client.configGet(["timeout", "maxmemory"]);
console.log(result); // Output: {'timeout': '1000', 'maxmemory': '1GB'}
```


#### :gear: configSet

Sets configuration parameters to the specified values.

The command will be routed to all nodes, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `configSet` | `(parameters: Record<string, any>, options?: RouteOption or undefined) => Promise<"OK">` |

Parameters:

* `parameters`: - A map consisting of configuration parameters and their respective values to set.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of configSet method to set multiple configuration parameters
const result = await client.configSet({ timeout: "1000", maxmemory: "1GB" });
console.log(result); // Output: 'OK'
```


#### :gear: echo

Echoes the provided `message` back.

The command will be routed to a random node, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `echo` | `(message: any, options?: (RouteOption and DecoderOption) or undefined) => Promise<any>` |

Parameters:

* `message`: - The message to be echoed back.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of the echo command
const echoedMessage = await client.echo("valkey-glide");
console.log(echoedMessage); // Output: "valkey-glide"
```
```typescript
// Example usage of the echo command with routing to all nodes
const echoedMessage = await client.echo("valkey-glide", "allNodes");
console.log(echoedMessage); // Output: {'addr': 'valkey-glide', 'addr2': 'valkey-glide', 'addr3': 'valkey-glide'}
```


#### :gear: time

Returns the server time.

The command will be routed to a random node, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `time` | `(options?: RouteOption or undefined) => Promise<ClusterResponse<[string, string]>>` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of time method without any argument
const result = await client.time();
console.log(result); // Output: ['1710925775', '913580']
```
```typescript
// Example usage of time method with routing to all nodes
const result = await client.time('allNodes');
console.log(result); // Output: {'addr': ['1710925775', '913580'], 'addr2': ['1710925775', '913580'], 'addr3': ['1710925775', '913580']}
```


#### :gear: copy

Copies the value stored at the `source` to the `destination` key. When `replace` is `true`,
removes the `destination` key first if it already exists, otherwise performs no action.

| Method | Type |
| ---------- | ---------- |
| `copy` | `(source: any, destination: any, options?: { replace?: boolean or undefined; } or undefined) => Promise<boolean>` |

Parameters:

* `source`: - The key to the source value.
* `destination`: - The key where the value should be copied to.
* `options`: - (Optional) Additional parameters:
- (Optional) `replace`: if `true`, the `destination` key should be removed before copying the
value to it. If not provided, no action will be performed if the key already exists.


Examples:

```typescript
const result = await client.copy("set1", "set2", { replace: true });
console.log(result); // Output: true - "set1" was copied to "set2".
```


#### :gear: lolwut

Displays a piece of generative computer art and the server version.

The command will be routed to a random node, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `lolwut` | `(options?: (LolwutOptions and RouteOption) or undefined) => Promise<ClusterResponse<string>>` |

Parameters:

* `options`: - (Optional) The LOLWUT options - see 


Examples:

```typescript
const response = await client.lolwut({ version: 6, parameters: [40, 20] }, "allNodes");
console.log(response); // Output: "Valkey ver. 7.2.3" - Indicates the current server version.
```


#### :gear: fcallWithRoute

Invokes a previously loaded function.

The command will be routed to a random node, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `fcallWithRoute` | `(func: any, args: any[], options?: (RouteOption and DecoderOption) or undefined) => Promise<any>` |

Parameters:

* `func`: - The function name.
* `args`: - A list of `function` arguments and it should not represent names of keys.
* `options`: - (Optional) See 


Examples:

```typescript
const response = await client.fcallWithRoute("Deep_Thought", [], "randomNode");
console.log(response); // Output: Returns the function's return value.
```


#### :gear: fcallReadonlyWithRoute

Invokes a previously loaded read-only function.

The command will be routed to a random node, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `fcallReadonlyWithRoute` | `(func: any, args: any[], options?: (RouteOption and DecoderOption) or undefined) => Promise<any>` |

Parameters:

* `func`: - The function name.
* `args`: - A list of `function` arguments and it should not represent names of keys.
* `options`: - (Optional) See 


Examples:

```typescript
const response = await client.fcallReadonlyWithRoute("Deep_Thought", ["Answer", "to", "the", "Ultimate",
           "Question", "of", "Life,", "the", "Universe,", "and", "Everything"], "randomNode");
console.log(response); // Output: 42 # The return value on the function that was execute.
```


#### :gear: functionDelete

Deletes a library and all its functions.

| Method | Type |
| ---------- | ---------- |
| `functionDelete` | `(libraryCode: any, options?: RouteOption or undefined) => Promise<"OK">` |

Parameters:

* `libraryCode`: - The library name to delete.
* `route`: - (Optional) The command will be routed to all primary node, unless `route` is provided, in which
case the client will route the command to the nodes defined by `route`.


Examples:

```typescript
const result = await client.functionDelete("libName");
console.log(result); // Output: 'OK'
```


#### :gear: functionLoad

Loads a library to Valkey.

| Method | Type |
| ---------- | ---------- |
| `functionLoad` | `(libraryCode: any, options?: ({ replace?: boolean or undefined; } and RouteOption and DecoderOption) or undefined) => Promise<any>` |

Parameters:

* `libraryCode`: - The source code that implements the library.
* `options`: - (Optional) Additional parameters:
- (Optional) `replace`: whether the given library should overwrite a library with the same name if it
already exists.
- (Optional) `route`: see 


Examples:

```typescript
const code = "#!lua name=mylib \n redis.register_function('myfunc', function(keys, args) return args[1] end)";
const result = await client.functionLoad(code, true, 'allNodes');
console.log(result); // Output: 'mylib'
```


#### :gear: functionFlush

Deletes all function libraries.

| Method | Type |
| ---------- | ---------- |
| `functionFlush` | `(options?: ({ mode?: FlushMode or undefined; } and RouteOption) or undefined) => Promise<"OK">` |

Parameters:

* `options`: - (Optional) Additional parameters:
- (Optional) `mode`: the flushing mode, could be either 


Examples:

```typescript
const result = await client.functionFlush(FlushMode.SYNC);
console.log(result); // Output: 'OK'
```


#### :gear: functionList

Returns information about the functions and libraries.

The command will be routed to a random node, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `functionList` | `(options?: (FunctionListOptions and DecoderOption and RouteOption) or undefined) => Promise<ClusterResponse<FunctionListResponse>>` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
// Request info for specific library including the source code
const result1 = await client.functionList({ libNamePattern: "myLib*", withCode: true });
// Request info for all libraries
const result2 = await client.functionList();
console.log(result2); // Output:
// [{
//     "library_name": "myLib5_backup",
//     "engine": "LUA",
//     "functions": [{
//         "name": "myfunc",
//         "description": null,
//         "flags": [ "no-writes" ],
//     }],
//     "library_code": "#!lua name=myLib5_backup \n redis.register_function('myfunc', function(keys, args) return args[1] end)"
// }]
```


#### :gear: functionStats

Returns information about the function that's currently running and information about the
available execution engines.

The command will be routed to all primary nodes, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `functionStats` | `(options?: (RouteOption and DecoderOption) or undefined) => Promise<ClusterResponse<FunctionStatsSingleResponse>>` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
const response = await client.functionStats("randomNode");
console.log(response); // Output:
// {
//     "running_script":
//     {
//         "name": "deep_thought",
//         "command": ["fcall", "deep_thought", "0"],
//         "duration_ms": 5008
//     },
//     "engines":
//     {
//         "LUA":
//         {
//             "libraries_count": 2,
//             "functions_count": 3
//         }
//     }
// }
// Output if no scripts running:
// {
//     "running_script": null
//     "engines":
//     {
//         "LUA":
//         {
//             "libraries_count": 2,
//             "functions_count": 3
//         }
//     }
// }
```


#### :gear: functionKill

Kills a function that is currently executing.
`FUNCTION KILL` terminates read-only functions only.

| Method | Type |
| ---------- | ---------- |
| `functionKill` | `(options?: RouteOption or undefined) => Promise<"OK">` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
await client.functionKill();
```


#### :gear: functionDump

Returns the serialized payload of all loaded libraries.

| Method | Type |
| ---------- | ---------- |
| `functionDump` | `(options?: RouteOption or undefined) => Promise<any>` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
const data = await client.functionDump();
// data can be used to restore loaded functions on any Valkey instance
```


#### :gear: functionRestore

Restores libraries from the serialized payload returned by {@link functionDump}.

| Method | Type |
| ---------- | ---------- |
| `functionRestore` | `(payload: Buffer, options?: ({ policy?: FunctionRestorePolicy or undefined; } and RouteOption) or undefined) => Promise<"OK">` |

Parameters:

* `payload`: - The serialized data from 
* `options`: - (Optional) Additional parameters:
- (Optional) `policy`: a policy for handling existing libraries, see 


Examples:

```typescript
await client.functionRestore(data, { policy: FunctionRestorePolicy.FLUSH, route: "allPrimaries" });
```


#### :gear: flushall

Deletes all the keys of all the existing databases. This command never fails.

The command will be routed to all primary nodes, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `flushall` | `(options?: ({ mode?: FlushMode or undefined; } and RouteOption) or undefined) => Promise<"OK">` |

Parameters:

* `options`: - (Optional) Additional parameters:
- (Optional) `mode`: the flushing mode, could be either 


Examples:

```typescript
const result = await client.flushall(FlushMode.SYNC);
console.log(result); // Output: 'OK'
```


#### :gear: flushdb

Deletes all the keys of the currently selected database. This command never fails.

The command will be routed to all primary nodes, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `flushdb` | `(options?: ({ mode?: FlushMode or undefined; } and RouteOption) or undefined) => Promise<"OK">` |

Parameters:

* `options`: - (Optional) Additional parameters:
- (Optional) `mode`: the flushing mode, could be either 


Examples:

```typescript
const result = await client.flushdb(FlushMode.SYNC);
console.log(result); // Output: 'OK'
```


#### :gear: dbsize

Returns the number of keys in the database.

The command will be routed to all nodes, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `dbsize` | `(options?: RouteOption or undefined) => Promise<number>` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
const numKeys = await client.dbsize("allPrimaries");
console.log("Number of keys across all primary nodes: ", numKeys);
```


#### :gear: publish

Publish a message on pubsub channel.
This command aggregates PUBLISH and SPUBLISH commands functionalities.
The mode is selected using the 'sharded' parameter.
For both sharded and non-sharded mode, request is routed using hashed channel as key.

| Method | Type |
| ---------- | ---------- |
| `publish` | `(message: any, channel: any, sharded?: boolean) => Promise<number>` |

Parameters:

* `message`: - Message to publish.
* `channel`: - Channel to publish the message on.
* `sharded`: - Use sharded pubsub mode. Available since Valkey version 7.0.


Examples:

```typescript
// Example usage of publish command
const result = await client.publish("Hi all!", "global-channel");
console.log(result); // Output: 1 - This message was posted to 1 subscription which is configured on primary node
```
```typescript
// Example usage of spublish command
const result = await client.publish("Hi all!", "global-channel", true);
console.log(result); // Output: 2 - Published 2 instances of "Hi to sharded channel1!" message on channel1 using sharded mode
```


#### :gear: pubsubShardChannels

Lists the currently active shard channels.
The command is routed to all nodes, and aggregates the response to a single array.

| Method | Type |
| ---------- | ---------- |
| `pubsubShardChannels` | `(options?: ({ pattern?: any; } and DecoderOption) or undefined) => Promise<any[]>` |

Parameters:

* `options`: - (Optional) Additional parameters:
- (Optional) `pattern`: A glob-style pattern to match active shard channels.
If not provided, all active shard channels are returned.
- (Optional) `decoder`: see 


Examples:

```typescript
const allChannels = await client.pubsubShardchannels();
console.log(allChannels); // Output: ["channel1", "channel2"]

const filteredChannels = await client.pubsubShardchannels("channel*");
console.log(filteredChannels); // Output: ["channel1", "channel2"]
```


#### :gear: pubsubShardNumSub

Returns the number of subscribers (exclusive of clients subscribed to patterns) for the specified shard channels.

| Method | Type |
| ---------- | ---------- |
| `pubsubShardNumSub` | `(channels: any[], options?: DecoderOption or undefined) => Promise<{ channel: any; numSub: number; }[]>` |

Parameters:

* `channels`: - The list of shard channels to query for the number of subscribers.
* `options`: - (Optional) see 


Examples:

```typescript
const result1 = await client.pubsubShardnumsub(["channel1", "channel2"]);
console.log(result1); // Output:
// [{ channel: "channel1", numSub: 3}, { channel: "channel2", numSub: 5 }]

const result2 = await client.pubsubShardnumsub([]);
console.log(result2); // Output: []
```


#### :gear: lastsave

Returns `UNIX TIME` of the last DB save timestamp or startup timestamp if no save
was made since then.

The command will be routed to a random node, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `lastsave` | `(options?: RouteOption or undefined) => Promise<ClusterResponse<number>>` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
const timestamp = await client.lastsave();
console.log("Last DB save was done at " + timestamp);
```


#### :gear: randomKey

Returns a random existing key name.

The command will be routed to all primary nodes, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `randomKey` | `(options?: (DecoderOption and RouteOption) or undefined) => Promise<any>` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
const result = await client.randomKey();
console.log(result); // Output: "key12" - "key12" is a random existing key name.
```


#### :gear: unwatch

Flushes all the previously watched keys for a transaction. Executing a transaction will
automatically flush all previously watched keys.

The command will be routed to all primary nodes, unless `route` is provided

| Method | Type |
| ---------- | ---------- |
| `unwatch` | `(options?: RouteOption or undefined) => Promise<"OK">` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
let response = await client.watch(["sampleKey"]);
console.log(response); // Output: "OK"
response = await client.unwatch();
console.log(response); // Output: "OK"
```


#### :gear: invokeScriptWithRoute

Invokes a Lua script with arguments.
This method simplifies the process of invoking scripts on a Valkey server by using an object that represents a Lua script.
The script loading, argument preparation, and execution will all be handled internally. If the script has not already been loaded,
it will be loaded automatically using the `SCRIPT LOAD` command. After that, it will be invoked using the `EVALSHA` command.

The command will be routed to a random node, unless `route` is provided.

| Method | Type |
| ---------- | ---------- |
| `invokeScriptWithRoute` | `(script: Script, options?: ({ args?: any[] or undefined; } and DecoderOption and RouteOption) or undefined) => Promise<any>` |

Parameters:

* `script`: - The Lua script to execute.
* `options`: - (Optional) Additional parameters:
- (Optional) `args`: the arguments for the script.
- (Optional) `decoder`: see 


Examples:

```typescript
const luaScript = new Script("return { ARGV[1] }");
const result = await client.invokeScript(luaScript, { args: ["bar"] });
console.log(result); // Output: ['bar']
```


#### :gear: scriptExists

Checks existence of scripts in the script cache by their SHA1 digest.

| Method | Type |
| ---------- | ---------- |
| `scriptExists` | `(sha1s: any[], options?: RouteOption or undefined) => Promise<ClusterResponse<boolean[]>>` |

Parameters:

* `sha1s`: - List of SHA1 digests of the scripts to check.
* `options`: - (Optional) See 


Examples:

```typescript
console result = await client.scriptExists(["sha1_digest1", "sha1_digest2"]);
console.log(result); // Output: [true, false]
```


#### :gear: scriptFlush

Flushes the Lua scripts cache.

| Method | Type |
| ---------- | ---------- |
| `scriptFlush` | `(options?: ({ mode?: FlushMode or undefined; } and RouteOption) or undefined) => Promise<"OK">` |

Parameters:

* `options`: - (Optional) Additional parameters:
- (Optional) `mode`: the flushing mode, could be either 


Examples:

```typescript
console result = await client.scriptFlush(FlushMode.SYNC);
console.log(result); // Output: "OK"
```


#### :gear: scriptKill

Kills the currently executing Lua script, assuming no write operation was yet performed by the script.

| Method | Type |
| ---------- | ---------- |
| `scriptKill` | `(options?: RouteOption or undefined) => Promise<"OK">` |

Parameters:

* `options`: - (Optional) See 


Examples:

```typescript
console result = await client.scriptKill();
console.log(result); // Output: "OK"
```


## :factory: SignedEncoding

Represents a signed argument encoding.

### Constructors

`public`: Creates an instance of SignedEncoding.

Parameters:

* `encodingLength`: - The bit size of the encoding. Must be less than 65 bits long.


### Methods

- [toArg](#gear-toarg)

#### :gear: toArg

Returns the encoding as a string argument to be used in the {@link BaseClient.bitfieldbitfield} or
{@link BaseClient.bitfieldReadOnlybitfieldReadOnly} commands.

| Method | Type |
| ---------- | ---------- |
| `toArg` | `() => string` |

## :factory: UnsignedEncoding

Represents an unsigned argument encoding.

### Constructors

`public`: Creates an instance of UnsignedEncoding.

Parameters:

* `encodingLength`: - The bit size of the encoding. Must be less than 64 bits long.


### Methods

- [toArg](#gear-toarg)

#### :gear: toArg

Returns the encoding as a string argument to be used in the {@link BaseClient.bitfieldbitfield} or
{@link BaseClient.bitfieldReadOnlybitfieldReadOnly} commands.

| Method | Type |
| ---------- | ---------- |
| `toArg` | `() => string` |

## :factory: BitOffset

Represents an offset in an array of bits for the {@link BaseClient.bitfieldbitfield} or
{@link BaseClient.bitfieldReadOnlybitfieldReadOnly} commands.

For example, if we have the binary `01101001` with offset of 1 for an unsigned encoding of size 4, then the value
is 13 from `0(1101)001`.

### Constructors

`public`: Creates an instance of BitOffset.

Parameters:

* `offset`: - The bit index offset in the array of bits. Must be greater than or equal to 0.


### Methods

- [toArg](#gear-toarg)

#### :gear: toArg

Returns the offset as a string argument to be used in the {@link BaseClient.bitfieldbitfield} or
{@link BaseClient.bitfieldReadOnlybitfieldReadOnly} commands.

| Method | Type |
| ---------- | ---------- |
| `toArg` | `() => string` |

## :factory: BitOffsetMultiplier

Represents an offset in an array of bits for the {@link BaseClient.bitfieldbitfield} or
{@link BaseClient.bitfieldReadOnlybitfieldReadOnly} commands. The bit offset index is calculated as the numerical
value of the offset multiplied by the encoding value.

For example, if we have the binary 01101001 with offset multiplier of 1 for an unsigned encoding of size 4, then the
value is 9 from `0110(1001)`.

### Constructors

`public`: Creates an instance of BitOffsetMultiplier.

Parameters:

* `offset`: - The offset in the array of bits, which will be multiplied by the encoding value to get the final
bit index offset.


### Methods

- [toArg](#gear-toarg)

#### :gear: toArg

Returns the offset as a string argument to be used in the {@link BaseClient.bitfieldbitfield} or
{@link BaseClient.bitfieldReadOnlybitfieldReadOnly} commands.

| Method | Type |
| ---------- | ---------- |
| `toArg` | `() => string` |

## :factory: BitFieldGet

Represents the "GET" subcommand for getting a value in the binary representation of the string stored in `key`.

### Constructors

`public`: Creates an instance of BitFieldGet.

Parameters:

* `encoding`: - The bit encoding for the subcommand.
* `offset`: - The offset in the array of bits from which to get the value.


### Methods

- [toArgs](#gear-toargs)

#### :gear: toArgs

Returns the subcommand as a list of string arguments to be used in the {@link BaseClient.bitfieldbitfield} or
{@link BaseClient.bitfieldReadOnlybitfieldReadOnly} commands.

| Method | Type |
| ---------- | ---------- |
| `toArgs` | `() => string[]` |

## :factory: BitFieldSet

Represents the "SET" subcommand for setting bits in the binary representation of the string stored in `key`.

### Constructors

`public`: Creates an instance of BitFieldSet

Parameters:

* `encoding`: - The bit encoding for the subcommand.
* `offset`: - The offset in the array of bits where the value will be set.
* `value`: - The value to set the bits in the binary value to.


### Methods

- [toArgs](#gear-toargs)

#### :gear: toArgs

Returns the subcommand as a list of string arguments to be used in the {@link BaseClient.bitfieldbitfield} or
{@link BaseClient.bitfieldReadOnlybitfieldReadOnly} commands.

| Method | Type |
| ---------- | ---------- |
| `toArgs` | `() => string[]` |

## :factory: BitFieldIncrBy

Represents the "INCRBY" subcommand for increasing or decreasing bits in the binary representation of the string
stored in `key`.

### Constructors

`public`: Creates an instance of BitFieldIncrBy

Parameters:

* `encoding`: - The bit encoding for the subcommand.
* `offset`: - The offset in the array of bits where the value will be incremented.
* `increment`: - The value to increment the bits in the binary value by.


### Methods

- [toArgs](#gear-toargs)

#### :gear: toArgs

Returns the subcommand as a list of string arguments to be used in the {@link BaseClient.bitfieldbitfield} or
{@link BaseClient.bitfieldReadOnlybitfieldReadOnly} commands.

| Method | Type |
| ---------- | ---------- |
| `toArgs` | `() => string[]` |

## :factory: BitFieldOverflow

Represents the "OVERFLOW" subcommand that determines the result of the "SET" or "INCRBY"
{@link BaseClient.bitfieldbitfield} subcommands when an underflow or overflow occurs.

### Constructors

`public`: Creates an instance of BitFieldOverflow.

Parameters:

* `overflowControl`: - The desired overflow behavior.


### Methods

- [toArgs](#gear-toargs)

#### :gear: toArgs

Returns the subcommand as a list of string arguments to be used in the {@link BaseClient.bitfieldbitfield} or
{@link BaseClient.bitfieldReadOnlybitfieldReadOnly} commands.

| Method | Type |
| ---------- | ---------- |
| `toArgs` | `() => string[]` |

## :factory: ValkeyError

Copyright Valkey GLIDE Project Contributors - SPDX Identifier: Apache-2.0

### Properties

- [message](#gear-message)

#### :gear: message

| Property | Type |
| ---------- | ---------- |
| `message` | `string` |

## :factory: ClosingError

## :factory: RequestError

## :factory: TimeoutError

## :factory: ExecAbortError

## :factory: ConnectionError

## :factory: ConfigurationError

## :factory: Logger

### Methods

- [log](#gear-log)
- [init](#gear-init)
- [setLoggerConfig](#gear-setloggerconfig)

#### :gear: log

take the arguments from the user and provide to the core-logger (see ../logger-core)
if the level is higher then the logger level (error is 0, warn 1, etc.) simply return without operation
if a logger instance doesn't exist, create new one with default mode (decided by rust core, normally - level: error, target: console)
logIdentifier arg is a string contain data that suppose to give the log a context and make it easier to find certain type of logs.
when the log is connect to certain task the identifier should be the task id, when the log is not part of specific task the identifier should give a context to the log - for example, "socket connection".
External users shouldn't use this function.

| Method | Type |
| ---------- | ---------- |
| `log` | `(logLevel: LevelOptions, logIdentifier: string, message: string) => void` |

#### :gear: init

Initialize a logger if it wasn't initialized before - this method is meant to be used when there is no intention to replace an existing logger.
The logger will filter all logs with a level lower than the given level,
If given a fileName argument, will write the logs to files postfixed with fileName. If fileName isn't provided, the logs will be written to the console.
To turn off the logger, provide the level "off".

| Method | Type |
| ---------- | ---------- |
| `init` | `(level?: LevelOptions or undefined, fileName?: string or undefined) => void` |

#### :gear: setLoggerConfig

configure the logger.
the level argument is the level of the logs you want the system to provide (error logs, warn logs, etc.)
the filename argument is optional - if provided the target of the logs will be the file mentioned, else will be the console
To turn off the logger, provide the level "off".

| Method | Type |
| ---------- | ---------- |
| `setLoggerConfig` | `(level: LevelOptions, fileName?: string or undefined) => void` |

## :factory: BaseClient

### Methods

- [processResponse](#gear-processresponse)
- [processPush](#gear-processpush)
- [cancelPubSubFuturesWithExceptionSafe](#gear-cancelpubsubfutureswithexceptionsafe)
- [isPubsubConfigured](#gear-ispubsubconfigured)
- [getPubsubCallbackAndContext](#gear-getpubsubcallbackandcontext)
- [getPubSubMessage](#gear-getpubsubmessage)
- [tryGetPubSubMessage](#gear-trygetpubsubmessage)
- [notificationToPubSubMessageSafe](#gear-notificationtopubsubmessagesafe)
- [completePubSubFuturesSafe](#gear-completepubsubfuturessafe)
- [get](#gear-get)
- [getex](#gear-getex)
- [getdel](#gear-getdel)
- [getrange](#gear-getrange)
- [set](#gear-set)
- [del](#gear-del)
- [dump](#gear-dump)
- [restore](#gear-restore)
- [mget](#gear-mget)
- [mset](#gear-mset)
- [msetnx](#gear-msetnx)
- [incr](#gear-incr)
- [incrBy](#gear-incrby)
- [incrByFloat](#gear-incrbyfloat)
- [decr](#gear-decr)
- [decrBy](#gear-decrby)
- [bitop](#gear-bitop)
- [getbit](#gear-getbit)
- [setbit](#gear-setbit)
- [bitpos](#gear-bitpos)
- [bitfield](#gear-bitfield)
- [bitfieldReadOnly](#gear-bitfieldreadonly)
- [hget](#gear-hget)
- [hset](#gear-hset)
- [hkeys](#gear-hkeys)
- [hsetnx](#gear-hsetnx)
- [hdel](#gear-hdel)
- [hmget](#gear-hmget)
- [hexists](#gear-hexists)
- [hgetall](#gear-hgetall)
- [hincrBy](#gear-hincrby)
- [hincrByFloat](#gear-hincrbyfloat)
- [hlen](#gear-hlen)
- [hvals](#gear-hvals)
- [hstrlen](#gear-hstrlen)
- [hrandfield](#gear-hrandfield)
- [hscan](#gear-hscan)
- [hrandfieldCount](#gear-hrandfieldcount)
- [hrandfieldWithValues](#gear-hrandfieldwithvalues)
- [lpush](#gear-lpush)
- [lpushx](#gear-lpushx)
- [lpop](#gear-lpop)
- [lpopCount](#gear-lpopcount)
- [lrange](#gear-lrange)
- [llen](#gear-llen)
- [lmove](#gear-lmove)
- [blmove](#gear-blmove)
- [lset](#gear-lset)
- [ltrim](#gear-ltrim)
- [lrem](#gear-lrem)
- [rpush](#gear-rpush)
- [rpushx](#gear-rpushx)
- [rpop](#gear-rpop)
- [rpopCount](#gear-rpopcount)
- [sadd](#gear-sadd)
- [srem](#gear-srem)
- [sscan](#gear-sscan)
- [smembers](#gear-smembers)
- [smove](#gear-smove)
- [scard](#gear-scard)
- [sinter](#gear-sinter)
- [sintercard](#gear-sintercard)
- [sinterstore](#gear-sinterstore)
- [sdiff](#gear-sdiff)
- [sdiffstore](#gear-sdiffstore)
- [sunion](#gear-sunion)
- [sunionstore](#gear-sunionstore)
- [sismember](#gear-sismember)
- [smismember](#gear-smismember)
- [spop](#gear-spop)
- [spopCount](#gear-spopcount)
- [srandmember](#gear-srandmember)
- [srandmemberCount](#gear-srandmembercount)
- [exists](#gear-exists)
- [unlink](#gear-unlink)
- [expire](#gear-expire)
- [expireAt](#gear-expireat)
- [expiretime](#gear-expiretime)
- [pexpire](#gear-pexpire)
- [pexpireAt](#gear-pexpireat)
- [pexpiretime](#gear-pexpiretime)
- [ttl](#gear-ttl)
- [invokeScript](#gear-invokescript)
- [scriptShow](#gear-scriptshow)
- [xrange](#gear-xrange)
- [xrevrange](#gear-xrevrange)
- [zadd](#gear-zadd)
- [zaddIncr](#gear-zaddincr)
- [zrem](#gear-zrem)
- [zcard](#gear-zcard)
- [zintercard](#gear-zintercard)
- [zdiff](#gear-zdiff)
- [zdiffWithScores](#gear-zdiffwithscores)
- [zdiffstore](#gear-zdiffstore)
- [zscore](#gear-zscore)
- [zunionstore](#gear-zunionstore)
- [zmscore](#gear-zmscore)
- [zcount](#gear-zcount)
- [zrange](#gear-zrange)
- [zrangeWithScores](#gear-zrangewithscores)
- [zrangeStore](#gear-zrangestore)
- [zinterstore](#gear-zinterstore)
- [zinter](#gear-zinter)
- [zinterWithScores](#gear-zinterwithscores)
- [zunion](#gear-zunion)
- [zunionWithScores](#gear-zunionwithscores)
- [zrandmember](#gear-zrandmember)
- [zrandmemberWithCount](#gear-zrandmemberwithcount)
- [zrandmemberWithCountWithScores](#gear-zrandmemberwithcountwithscores)
- [strlen](#gear-strlen)
- [type](#gear-type)
- [zpopmin](#gear-zpopmin)
- [bzpopmin](#gear-bzpopmin)
- [zpopmax](#gear-zpopmax)
- [bzpopmax](#gear-bzpopmax)
- [pttl](#gear-pttl)
- [zremRangeByRank](#gear-zremrangebyrank)
- [zremRangeByLex](#gear-zremrangebylex)
- [zremRangeByScore](#gear-zremrangebyscore)
- [zlexcount](#gear-zlexcount)
- [zrank](#gear-zrank)
- [zrankWithScore](#gear-zrankwithscore)
- [zrevrank](#gear-zrevrank)
- [zrevrankWithScore](#gear-zrevrankwithscore)
- [xadd](#gear-xadd)
- [xdel](#gear-xdel)
- [xtrim](#gear-xtrim)
- [xread](#gear-xread)
- [xreadgroup](#gear-xreadgroup)
- [xlen](#gear-xlen)
- [xpending](#gear-xpending)
- [xpendingWithOptions](#gear-xpendingwithoptions)
- [xinfoConsumers](#gear-xinfoconsumers)
- [xinfoGroups](#gear-xinfogroups)
- [xclaim](#gear-xclaim)
- [xautoclaim](#gear-xautoclaim)
- [xautoclaimJustId](#gear-xautoclaimjustid)
- [xclaimJustId](#gear-xclaimjustid)
- [xgroupCreate](#gear-xgroupcreate)
- [xgroupDestroy](#gear-xgroupdestroy)
- [xinfoStream](#gear-xinfostream)
- [xgroupCreateConsumer](#gear-xgroupcreateconsumer)
- [xgroupDelConsumer](#gear-xgroupdelconsumer)
- [xack](#gear-xack)
- [xgroupSetId](#gear-xgroupsetid)
- [lindex](#gear-lindex)
- [linsert](#gear-linsert)
- [persist](#gear-persist)
- [rename](#gear-rename)
- [renamenx](#gear-renamenx)
- [brpop](#gear-brpop)
- [blpop](#gear-blpop)
- [pfadd](#gear-pfadd)
- [pfcount](#gear-pfcount)
- [pfmerge](#gear-pfmerge)
- [objectEncoding](#gear-objectencoding)
- [objectFreq](#gear-objectfreq)
- [objectIdletime](#gear-objectidletime)
- [objectRefcount](#gear-objectrefcount)
- [fcall](#gear-fcall)
- [fcallReadonly](#gear-fcallreadonly)
- [lpos](#gear-lpos)
- [bitcount](#gear-bitcount)
- [geoadd](#gear-geoadd)
- [geosearch](#gear-geosearch)
- [geosearchstore](#gear-geosearchstore)
- [geopos](#gear-geopos)
- [zmpop](#gear-zmpop)
- [bzmpop](#gear-bzmpop)
- [zincrby](#gear-zincrby)
- [zscan](#gear-zscan)
- [geodist](#gear-geodist)
- [geohash](#gear-geohash)
- [lcs](#gear-lcs)
- [lcsLen](#gear-lcslen)
- [lcsIdx](#gear-lcsidx)
- [touch](#gear-touch)
- [watch](#gear-watch)
- [wait](#gear-wait)
- [setrange](#gear-setrange)
- [append](#gear-append)
- [lmpop](#gear-lmpop)
- [blmpop](#gear-blmpop)
- [pubsubChannels](#gear-pubsubchannels)
- [pubsubNumPat](#gear-pubsubnumpat)
- [pubsubNumSub](#gear-pubsubnumsub)
- [sort](#gear-sort)
- [sortReadOnly](#gear-sortreadonly)
- [sortStore](#gear-sortstore)
- [close](#gear-close)
- [getStatistics](#gear-getstatistics)

#### :gear: processResponse

| Method | Type |
| ---------- | ---------- |
| `processResponse` | `(message: response.Response) => void` |

#### :gear: processPush

| Method | Type |
| ---------- | ---------- |
| `processPush` | `(response: response.Response) => void` |

#### :gear: cancelPubSubFuturesWithExceptionSafe

| Method | Type |
| ---------- | ---------- |
| `cancelPubSubFuturesWithExceptionSafe` | `(exception: ConnectionError) => void` |

#### :gear: isPubsubConfigured

| Method | Type |
| ---------- | ---------- |
| `isPubsubConfigured` | `(config: GlideClientConfiguration or GlideClusterClientConfiguration) => boolean` |

#### :gear: getPubsubCallbackAndContext

| Method | Type |
| ---------- | ---------- |
| `getPubsubCallbackAndContext` | `(config: GlideClientConfiguration or GlideClusterClientConfiguration) => [((msg: PubSubMsg, context: any) => void) or null or undefined, any]` |

#### :gear: getPubSubMessage

| Method | Type |
| ---------- | ---------- |
| `getPubSubMessage` | `() => Promise<PubSubMsg>` |

#### :gear: tryGetPubSubMessage

| Method | Type |
| ---------- | ---------- |
| `tryGetPubSubMessage` | `(decoder?: Decoder or undefined) => PubSubMsg or null` |

#### :gear: notificationToPubSubMessageSafe

| Method | Type |
| ---------- | ---------- |
| `notificationToPubSubMessageSafe` | `(pushNotification: response.Response, decoder?: Decoder or undefined) => PubSubMsg or null` |

#### :gear: completePubSubFuturesSafe

| Method | Type |
| ---------- | ---------- |
| `completePubSubFuturesSafe` | `() => void` |

#### :gear: get

Get the value associated with the given key, or null if no such value exists.

| Method | Type |
| ---------- | ---------- |
| `get` | `(key: any, options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `key`: - The key to retrieve from the database.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of get method to retrieve the value of a key
const result = await client.get("key");
console.log(result); // Output: 'value'
// Example usage of get method to retrieve the value of a key with Bytes decoder
const result = await client.get("key", Decoder.Bytes);
console.log(result); // Output: {"data": [118, 97, 108, 117, 101], "type": "Buffer"}
```


#### :gear: getex

Get the value of `key` and optionally set its expiration. `GETEX` is similar to {@link get}.

| Method | Type |
| ---------- | ---------- |
| `getex` | `(key: any, options?: ({ expiry: "persist" or { type: TimeUnit; duration: number; }; } and DecoderOption) or undefined) => Promise<any>` |

Parameters:

* `key`: - The key to retrieve from the database.
* `options`: - (Optional) Additional Parameters:
- (Optional) `expiry`: expiriation to the given key:
`"persist"` will retain the time to live associated with the key. Equivalent to `PERSIST` in the VALKEY API.
Otherwise, a 


Examples:

```typescript
const result = await client.getex("key", {expiry: { type: TimeUnit.Seconds, count: 5 }});
console.log(result); // Output: 'value'
```


#### :gear: getdel

Gets a string value associated with the given `key`and deletes the key.

| Method | Type |
| ---------- | ---------- |
| `getdel` | `(key: any, options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `key`: - The key to retrieve from the database.
* `options`: - (Optional) See 


Examples:

```typescript
const result = client.getdel("key");
console.log(result); // Output: 'value'

const value = client.getdel("key");  // value is null
```


#### :gear: getrange

Returns the substring of the string value stored at `key`, determined by the byte offsets
`start` and `end` (both are inclusive). Negative offsets can be used in order to provide
an offset starting from the end of the string. So `-1` means the last character, `-2` the
penultimate and so forth. If `key` does not exist, an empty string is returned. If `start`
or `end` are out of range, returns the substring within the valid range of the string.

| Method | Type |
| ---------- | ---------- |
| `getrange` | `(key: any, start: number, end: number, options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `key`: - The key of the string.
* `start`: - The starting byte offset.
* `end`: - The ending byte offset.
* `options`: - (Optional) See 


Examples:

```typescript
await client.set("mykey", "This is a string")
let result = await client.getrange("mykey", 0, 3)
console.log(result); // Output: "This"
result = await client.getrange("mykey", -3, -1)
console.log(result); // Output: "ing" - extracted last 3 characters of a string
result = await client.getrange("mykey", 0, 100)
console.log(result); // Output: "This is a string"
result = await client.getrange("mykey", 5, 6)
console.log(result); // Output: ""
```


#### :gear: set

Set the given key with the given value. Return value is dependent on the passed options.

| Method | Type |
| ---------- | ---------- |
| `set` | `(key: any, value: any, options?: (SetOptions and DecoderOption) or undefined) => Promise<any>` |

Parameters:

* `key`: - The key to store.
* `value`: - The value to store with the given key.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of set method to set a key-value pair
const result = await client.set("my_key", "my_value");
console.log(result); // Output: 'OK'

// Example usage of set method with conditional options and expiration
const result2 = await client.set("key", "new_value", {conditionalSet: "onlyIfExists", expiry: { type: TimeUnit.Seconds, count: 5 }});
console.log(result2); // Output: 'OK' - Set "new_value" to "key" only if "key" already exists, and set the key expiration to 5 seconds.

// Example usage of set method with conditional options and returning old value
const result3 = await client.set("key", "value", {conditionalSet: "onlyIfDoesNotExist", returnOldValue: true});
console.log(result3); // Output: 'new_value' - Returns the old value of "key".

// Example usage of get method to retrieve the value of a key
const result4 = await client.get("key");
console.log(result4); // Output: 'new_value' - Value wasn't modified back to being "value" because of "NX" flag.
```


#### :gear: del

Removes the specified keys. A key is ignored if it does not exist.

| Method | Type |
| ---------- | ---------- |
| `del` | `(keys: any[]) => Promise<number>` |

Parameters:

* `keys`: - The keys we wanted to remove.


Examples:

```typescript
// Example usage of del method to delete an existing key
await client.set("my_key", "my_value");
const result = await client.del(["my_key"]);
console.log(result); // Output: 1
```
```typescript
// Example usage of del method for a non-existing key
const result = await client.del(["non_existing_key"]);
console.log(result); // Output: 0
```


#### :gear: dump

Serialize the value stored at `key` in a Valkey-specific format and return it to the user.

| Method | Type |
| ---------- | ---------- |
| `dump` | `(key: any) => Promise<any>` |

Parameters:

* `key`: - The `key` to serialize.


Examples:

```typescript
let result = await client.dump("myKey");
console.log(result); // Output: the serialized value of "myKey"
```
```typescript
result = await client.dump("nonExistingKey");
console.log(result); // Output: `null`
```


#### :gear: restore

Create a `key` associated with a `value` that is obtained by deserializing the provided
serialized `value` (obtained via {@link dump}).

| Method | Type |
| ---------- | ---------- |
| `restore` | `(key: any, ttl: number, value: Buffer, options?: RestoreOptions or undefined) => Promise<"OK">` |

Parameters:

* `key`: - The `key` to create.
* `ttl`: - The expiry time (in milliseconds). If `0`, the `key` will persist.
* `value`: - The serialized value to deserialize and assign to `key`.
* `options`: - (Optional) Restore options 


Examples:

```typescript
const result = await client.restore("myKey", 0, value);
console.log(result); // Output: "OK"
```
```typescript
const result = await client.restore("myKey", 1000, value, {replace: true, absttl: true});
console.log(result); // Output: "OK"
```
```typescript
const result = await client.restore("myKey", 0, value, {replace: true, idletime: 10});
console.log(result); // Output: "OK"
```
```typescript
const result = await client.restore("myKey", 0, value, {replace: true, frequency: 10});
console.log(result); // Output: "OK"
```


#### :gear: mget

Retrieve the values of multiple keys.

| Method | Type |
| ---------- | ---------- |
| `mget` | `(keys: any[], options?: DecoderOption or undefined) => Promise<any[]>` |

Parameters:

* `keys`: - A list of keys to retrieve values for.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of mget method to retrieve values of multiple keys
await client.set("key1", "value1");
await client.set("key2", "value2");
const result = await client.mget(["key1", "key2"]);
console.log(result); // Output: ['value1', 'value2']
```


#### :gear: mset

Set multiple keys to multiple values in a single operation.

| Method | Type |
| ---------- | ---------- |
| `mset` | `(keysAndValues: Record<string, any> or GlideRecord<any>) => Promise<"OK">` |

Parameters:

* `keysAndValues`: - A list of key-value pairs to set.


Examples:

```typescript
// Example usage of mset method to set values for multiple keys
const result = await client.mset({"key1": "value1", "key2": "value2"});
console.log(result); // Output: 'OK'
```
```typescript
// Example usage of mset method to set values for multiple keys (GlideRecords allow binary data in the key)
const result = await client.mset([{key: "key1", value: "value1"}, {key: "key2", value: "value2"}]);
console.log(result); // Output: 'OK'
```


#### :gear: msetnx

Sets multiple keys to values if the key does not exist. The operation is atomic, and if one or
more keys already exist, the entire operation fails.

| Method | Type |
| ---------- | ---------- |
| `msetnx` | `(keysAndValues: Record<string, any> or GlideRecord<any>) => Promise<boolean>` |

Parameters:

* `keysAndValues`: - A list of key-value pairs to set.


Examples:

```typescript
const result1 = await client.msetnx({"key1": "value1", "key2": "value2"});
console.log(result1); // Output: `true`

const result2 = await client.msetnx({"key2": "value4", "key3": "value5"});
console.log(result2); // Output: `false`
```


#### :gear: incr

Increments the number stored at `key` by one. If `key` does not exist, it is set to 0 before performing the operation.

| Method | Type |
| ---------- | ---------- |
| `incr` | `(key: any) => Promise<number>` |

Parameters:

* `key`: - The key to increment its value.


Examples:

```typescript
// Example usage of incr method to increment the value of a key
await client.set("my_counter", "10");
const result = await client.incr("my_counter");
console.log(result); // Output: 11
```


#### :gear: incrBy

Increments the number stored at `key` by `amount`. If `key` does not exist, it is set to 0 before performing the operation.

| Method | Type |
| ---------- | ---------- |
| `incrBy` | `(key: any, amount: number) => Promise<number>` |

Parameters:

* `key`: - The key to increment its value.
* `amount`: - The amount to increment.


Examples:

```typescript
// Example usage of incrBy method to increment the value of a key by a specified amount
await client.set("my_counter", "10");
const result = await client.incrBy("my_counter", 5);
console.log(result); // Output: 15
```


#### :gear: incrByFloat

Increment the string representing a floating point number stored at `key` by `amount`.
By using a negative increment value, the result is that the value stored at `key` is decremented.
If `key` does not exist, it is set to 0 before performing the operation.

| Method | Type |
| ---------- | ---------- |
| `incrByFloat` | `(key: any, amount: number) => Promise<number>` |

Parameters:

* `key`: - The key to increment its value.
* `amount`: - The amount to increment.


Examples:

```typescript
// Example usage of incrByFloat method to increment the value of a floating point key by a specified amount
await client.set("my_float_counter", "10.5");
const result = await client.incrByFloat("my_float_counter", 2.5);
console.log(result); // Output: 13.0
```


#### :gear: decr

Decrements the number stored at `key` by one. If `key` does not exist, it is set to 0 before performing the operation.

| Method | Type |
| ---------- | ---------- |
| `decr` | `(key: any) => Promise<number>` |

Parameters:

* `key`: - The key to decrement its value.


Examples:

```typescript
// Example usage of decr method to decrement the value of a key by 1
await client.set("my_counter", "10");
const result = await client.decr("my_counter");
console.log(result); // Output: 9
```


#### :gear: decrBy

Decrements the number stored at `key` by `amount`. If `key` does not exist, it is set to 0 before performing the operation.

| Method | Type |
| ---------- | ---------- |
| `decrBy` | `(key: any, amount: number) => Promise<number>` |

Parameters:

* `key`: - The key to decrement its value.
* `amount`: - The amount to decrement.


Examples:

```typescript
// Example usage of decrby method to decrement the value of a key by a specified amount
await client.set("my_counter", "10");
const result = await client.decrby("my_counter", 5);
console.log(result); // Output: 5
```


#### :gear: bitop

Perform a bitwise operation between multiple keys (containing string values) and store the result in the
`destination`.

| Method | Type |
| ---------- | ---------- |
| `bitop` | `(operation: BitwiseOperation, destination: any, keys: any[]) => Promise<number>` |

Parameters:

* `operation`: - The bitwise operation to perform.
* `destination`: - The key that will store the resulting string.
* `keys`: - The list of keys to perform the bitwise operation on.


Examples:

```typescript
await client.set("key1", "A"); // "A" has binary value 01000001
await client.set("key2", "B"); // "B" has binary value 01000010
const result1 = await client.bitop(BitwiseOperation.AND, "destination", ["key1", "key2"]);
console.log(result1); // Output: 1 - The size of the resulting string stored in "destination" is 1.

const result2 = await client.get("destination");
console.log(result2); // Output: "@" - "@" has binary value 01000000
```


#### :gear: getbit

Returns the bit value at `offset` in the string value stored at `key`. `offset` must be greater than or equal
to zero.

| Method | Type |
| ---------- | ---------- |
| `getbit` | `(key: any, offset: number) => Promise<number>` |

Parameters:

* `key`: - The key of the string.
* `offset`: - The index of the bit to return.


Examples:

```typescript
const result = await client.getbit("key", 1);
console.log(result); // Output: 1 - The second bit of the string stored at "key" is set to 1.
```


#### :gear: setbit

Sets or clears the bit at `offset` in the string value stored at `key`. The `offset` is a zero-based index, with
`0` being the first element of the list, `1` being the next element, and so on. The `offset` must be less than
`2^32` and greater than or equal to `0`. If a key is non-existent then the bit at `offset` is set to `value` and
the preceding bits are set to `0`.

| Method | Type |
| ---------- | ---------- |
| `setbit` | `(key: any, offset: number, value: number) => Promise<number>` |

Parameters:

* `key`: - The key of the string.
* `offset`: - The index of the bit to be set.
* `value`: - The bit value to set at `offset`. The value must be `0` or `1`.


Examples:

```typescript
const result = await client.setbit("key", 1, 1);
console.log(result); // Output: 0 - The second bit value was 0 before setting to 1.
```


#### :gear: bitpos

Returns the position of the first bit matching the given `bit` value. The optional starting offset
`start` is a zero-based index, with `0` being the first byte of the list, `1` being the next byte and so on.
The offset can also be a negative number indicating an offset starting at the end of the list, with `-1` being
the last byte of the list, `-2` being the penultimate, and so on.

| Method | Type |
| ---------- | ---------- |
| `bitpos` | `(key: any, bit: number, options?: BitOffsetOptions or undefined) => Promise<number>` |

Parameters:

* `key`: - The key of the string.
* `bit`: - The bit value to match. Must be `0` or `1`.
* `options`: - (Optional) The 


Examples:

```typescript
await client.set("key1", "A1");  // "A1" has binary value 01000001 00110001
const result1 = await client.bitpos("key1", 1);
console.log(result1); // Output: 1 - The first occurrence of bit value 1 in the string stored at "key1" is at the second position.

const result2 = await client.bitpos("key1", 1, { start: -1 });
console.log(result2); // Output: 10 - The first occurrence of bit value 1, starting at the last byte in the string stored at "key1", is at the eleventh position.

await client.set("key1", "A12");  // "A12" has binary value 01000001 00110001 00110010
const result3 = await client.bitpos("key1", 1, { start: 1, end: -1 });
console.log(result3); // Output: 10 - The first occurrence of bit value 1 in the second byte to the last byte of the string stored at "key1" is at the eleventh position.

const result4 = await client.bitpos("key1", 1, { start: 2, end: 9, indexType: BitmapIndexType.BIT });
console.log(result4); // Output: 7 - The first occurrence of bit value 1 in the third to tenth bits of the string stored at "key1" is at the eighth position.
```


#### :gear: bitfield

Reads or modifies the array of bits representing the string that is held at `key` based on the specified
`subcommands`.

| Method | Type |
| ---------- | ---------- |
| `bitfield` | `(key: any, subcommands: BitFieldSubCommands[]) => Promise<(number or null)[]>` |

Parameters:

* `key`: - The key of the string.
* `subcommands`: - The subcommands to be performed on the binary value of the string at `key`, which could be
any of the following:

- 


Examples:

```typescript
await client.set("key", "A");  // "A" has binary value 01000001
const result = await client.bitfield("key", [new BitFieldSet(new UnsignedEncoding(2), new BitOffset(1), 3), new BitFieldGet(new UnsignedEncoding(2), new BitOffset(1))]);
console.log(result); // Output: [2, 3] - The old value at offset 1 with an unsigned encoding of 2 was 2. The new value at offset 1 with an unsigned encoding of 2 is 3.
```


#### :gear: bitfieldReadOnly

Reads the array of bits representing the string that is held at `key` based on the specified `subcommands`.

| Method | Type |
| ---------- | ---------- |
| `bitfieldReadOnly` | `(key: any, subcommands: BitFieldGet[]) => Promise<number[]>` |

Parameters:

* `key`: - The key of the string.
* `subcommands`: - The 


Examples:

```typescript
await client.set("key", "A");  // "A" has binary value 01000001
const result = await client.bitfieldReadOnly("key", [new BitFieldGet(new UnsignedEncoding(2), new BitOffset(1))]);
console.log(result); // Output: [2] - The value at offset 1 with an unsigned encoding of 2 is 2.
```


#### :gear: hget

Retrieve the value associated with `field` in the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hget` | `(key: any, field: any, options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `key`: - The key of the hash.
* `field`: - The field in the hash stored at `key` to retrieve from the database.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of the hget method on an-existing field
await client.hset("my_hash", {"field": "value"});
const result = await client.hget("my_hash", "field");
console.log(result); // Output: "value"
```
```typescript
// Example usage of the hget method on a non-existing field
const result = await client.hget("my_hash", "nonexistent_field");
console.log(result); // Output: null
```


#### :gear: hset

Sets the specified fields to their respective values in the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hset` | `(key: any, fieldsAndValues: Record<string, any> or HashDataType) => Promise<number>` |

Parameters:

* `key`: - The key of the hash.
* `fieldsAndValues`: - A list of field names and their values.


Examples:

```typescript
// Example usage of the hset method using HashDataType as input type
const result = await client.hset("my_hash", [{"field": "field1", "value": "value1"}, {"field": "field2", "value": "value2"}]);
console.log(result); // Output: 2 - Indicates that 2 fields were successfully set in the hash "my_hash".

// Example usage of the hset method using Record<string, GlideString> as input
const result = await client.hset("my_hash", {"field1": "value", "field2": "value2"});
console.log(result); // Output: 2 - Indicates that 2 fields were successfully set in the hash "my_hash".
```


#### :gear: hkeys

Returns all field names in the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hkeys` | `(key: any, options?: DecoderOption or undefined) => Promise<any[]>` |

Parameters:

* `key`: - The key of the hash.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of the hkeys method:
await client.hset("my_hash", {"field1": "value1", "field2": "value2", "field3": "value3"});
const result = await client.hkeys("my_hash");
console.log(result); // Output: ["field1", "field2", "field3"]  - Returns all the field names stored in the hash "my_hash".
```


#### :gear: hsetnx

Sets `field` in the hash stored at `key` to `value`, only if `field` does not yet exist.
If `key` does not exist, a new key holding a hash is created.
If `field` already exists, this operation has no effect.

| Method | Type |
| ---------- | ---------- |
| `hsetnx` | `(key: any, field: any, value: any) => Promise<boolean>` |

Parameters:

* `key`: - The key of the hash.
* `field`: - The field to set the value for.
* `value`: - The value to set.


Examples:

```typescript
// Example usage of the hsetnx method
const result = await client.hsetnx("my_hash", "field", "value");
console.log(result); // Output: true - Indicates that the field "field" was set successfully in the hash "my_hash".
```
```typescript
// Example usage of the hsetnx method on a field that already exists
const result = await client.hsetnx("my_hash", "field", "new_value");
console.log(result); // Output: false - Indicates that the field "field" already existed in the hash "my_hash" and was not set again.
```


#### :gear: hdel

Removes the specified fields from the hash stored at `key`.
Specified fields that do not exist within this hash are ignored.

| Method | Type |
| ---------- | ---------- |
| `hdel` | `(key: any, fields: any[]) => Promise<number>` |

Parameters:

* `key`: - The key of the hash.
* `fields`: - The fields to remove from the hash stored at `key`.


Examples:

```typescript
// Example usage of the hdel method
const result = await client.hdel("my_hash", ["field1", "field2"]);
console.log(result); // Output: 2 - Indicates that two fields were successfully removed from the hash.
```


#### :gear: hmget

Returns the values associated with the specified fields in the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hmget` | `(key: any, fields: any[], options?: DecoderOption or undefined) => Promise<any[]>` |

Parameters:

* `key`: - The key of the hash.
* `fields`: - The fields in the hash stored at `key` to retrieve from the database.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of the hmget method
const result = await client.hmget("my_hash", ["field1", "field2"]);
console.log(result); // Output: ["value1", "value2"] - A list of values associated with the specified fields.
```


#### :gear: hexists

Returns if `field` is an existing field in the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hexists` | `(key: any, field: any) => Promise<boolean>` |

Parameters:

* `key`: - The key of the hash.
* `field`: - The field to check in the hash stored at `key`.


Examples:

```typescript
// Example usage of the hexists method with existing field
const result = await client.hexists("my_hash", "field1");
console.log(result); // Output: true
```
```typescript
// Example usage of the hexists method with non-existing field
const result = await client.hexists("my_hash", "nonexistent_field");
console.log(result); // Output: false
```


#### :gear: hgetall

Returns all fields and values of the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hgetall` | `(key: any, options?: DecoderOption or undefined) => Promise<HashDataType>` |

Parameters:

* `key`: - The key of the hash.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of the hgetall method
const result = await client.hgetall("my_hash");
console.log(result); // Output:
// [
//     { field: "field1", value: "value1"},
//     { field: "field2", value: "value2"}
// ]
```


#### :gear: hincrBy

Increments the number stored at `field` in the hash stored at `key` by increment.
By using a negative increment value, the value stored at `field` in the hash stored at `key` is decremented.
If `field` or `key` does not exist, it is set to 0 before performing the operation.

| Method | Type |
| ---------- | ---------- |
| `hincrBy` | `(key: any, field: any, amount: number) => Promise<number>` |

Parameters:

* `key`: - The key of the hash.
* `amount`: - The amount to increment.
* `field`: - The field in the hash stored at `key` to increment its value.


Examples:

```typescript
// Example usage of the hincrby method to increment the value in a hash by a specified amount
const result = await client.hincrby("my_hash", "field1", 5);
console.log(result); // Output: 5
```


#### :gear: hincrByFloat

Increment the string representing a floating point number stored at `field` in the hash stored at `key` by increment.
By using a negative increment value, the value stored at `field` in the hash stored at `key` is decremented.
If `field` or `key` does not exist, it is set to 0 before performing the operation.

| Method | Type |
| ---------- | ---------- |
| `hincrByFloat` | `(key: any, field: any, amount: number) => Promise<number>` |

Parameters:

* `key`: - The key of the hash.
* `amount`: - The amount to increment.
* `field`: - The field in the hash stored at `key` to increment its value.


Examples:

```typescript
// Example usage of the hincrbyfloat method to increment the value of a floating point in a hash by a specified amount
const result = await client.hincrbyfloat("my_hash", "field1", 2.5);
console.log(result); // Output: 2.5
```


#### :gear: hlen

Returns the number of fields contained in the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hlen` | `(key: any) => Promise<number>` |

Parameters:

* `key`: - The key of the hash.


Examples:

```typescript
// Example usage of the hlen method with an existing key
const result = await client.hlen("my_hash");
console.log(result); // Output: 3
```
```typescript
// Example usage of the hlen method with a non-existing key
const result = await client.hlen("non_existing_key");
console.log(result); // Output: 0
```


#### :gear: hvals

Returns all values in the hash stored at key.

| Method | Type |
| ---------- | ---------- |
| `hvals` | `(key: any, options?: DecoderOption or undefined) => Promise<any[]>` |

Parameters:

* `key`: - The key of the hash.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of the hvals method
const result = await client.hvals("my_hash");
console.log(result); // Output: ["value1", "value2", "value3"] - Returns all the values stored in the hash "my_hash".
```


#### :gear: hstrlen

Returns the string length of the value associated with `field` in the hash stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hstrlen` | `(key: any, field: any) => Promise<number>` |

Parameters:

* `key`: - The key of the hash.
* `field`: - The field in the hash.


Examples:

```typescript
await client.hset("my_hash", {"field": "value"});
const result = await client.hstrlen("my_hash", "field");
console.log(result); // Output: 5
```


#### :gear: hrandfield

Returns a random field name from the hash value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hrandfield` | `(key: any, options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `key`: - The key of the hash.
* `options`: - (Optional) See 


Examples:

```typescript
console.log(await client.hrandfield("myHash")); // Output: 'field'
```


#### :gear: hscan

Iterates incrementally over a hash.

| Method | Type |
| ---------- | ---------- |
| `hscan` | `(key: any, cursor: string, options?: (BaseScanOptions and { readonly noValues?: boolean or undefined; } and DecoderOption) or undefined) => Promise<[string, any[]]>` |

Parameters:

* `key`: - The key of the set.
* `cursor`: - The cursor that points to the next iteration of results. A value of `"0"` indicates the start of the search.
* `options`: - (Optional) See 


Examples:

```typescript
// Assume "key" contains a hash with multiple members
let newCursor = "0";
let result = [];
do {
     result = await client.hscan(key1, newCursor, {
         match: "*",
         count: 3,
     });
     newCursor = result[0];
     console.log("Cursor: ", newCursor);
     console.log("Members: ", result[1]);
} while (newCursor !== "0");
// The output of the code above is something similar to:
// Cursor:  31
// Members:  ['field 79', 'value 79', 'field 20', 'value 20', 'field 115', 'value 115']
// Cursor:  39
// Members:  ['field 63', 'value 63', 'field 293', 'value 293', 'field 162', 'value 162']
// Cursor:  0
// Members:  ['field 55', 'value 55', 'field 24', 'value 24', 'field 90', 'value 90', 'field 113', 'value 113']
```
```typescript
// Hscan with noValues
let newCursor = "0";
let result = [];
do {
     result = await client.hscan(key1, newCursor, {
         match: "*",
         count: 3,
         noValues: true,
     });
     newCursor = result[0];
     console.log("Cursor: ", newCursor);
     console.log("Members: ", result[1]);
} while (newCursor !== "0");
// The output of the code above is something similar to:
// Cursor:  31
// Members:  ['field 79', 'field 20', 'field 115']
// Cursor:  39
// Members:  ['field 63', 'field 293', 'field 162']
// Cursor:  0
// Members:  ['field 55', 'field 24', 'field 90', 'field 113']
```


#### :gear: hrandfieldCount

Retrieves up to `count` random field names from the hash value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hrandfieldCount` | `(key: any, count: number, options?: DecoderOption or undefined) => Promise<any[]>` |

Parameters:

* `key`: - The key of the hash.
* `count`: - The number of field names to return.
* `options`: - (Optional) See 


Examples:

```typescript
console.log(await client.hrandfieldCount("myHash", 2)); // Output: ['field1', 'field2']
```


#### :gear: hrandfieldWithValues

Retrieves up to `count` random field names along with their values from the hash
value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `hrandfieldWithValues` | `(key: any, count: number, options?: DecoderOption or undefined) => Promise<[any, any][]>` |

Parameters:

* `key`: - The key of the hash.
* `count`: - The number of field names to return.
* `options`: - (Optional) See 


Examples:

```typescript
const result = await client.hrandfieldCountWithValues("myHash", 2);
console.log(result); // Output: [['field1', 'value1'], ['field2', 'value2']]
```


#### :gear: lpush

Inserts all the specified values at the head of the list stored at `key`.
`elements` are inserted one after the other to the head of the list, from the leftmost element to the rightmost element.
If `key` does not exist, it is created as empty list before performing the push operations.

| Method | Type |
| ---------- | ---------- |
| `lpush` | `(key: any, elements: any[]) => Promise<number>` |

Parameters:

* `key`: - The key of the list.
* `elements`: - The elements to insert at the head of the list stored at `key`.


Examples:

```typescript
// Example usage of the lpush method with an existing list
const result = await client.lpush("my_list", ["value2", "value3"]);
console.log(result); // Output: 3 - Indicated that the new length of the list is 3 after the push operation.
```
```typescript
// Example usage of the lpush method with a non-existing list
const result = await client.lpush("nonexistent_list", ["new_value"]);
console.log(result); // Output: 1 - Indicates that a new list was created with one element
```


#### :gear: lpushx

Inserts specified values at the head of the `list`, only if `key` already
exists and holds a list.

| Method | Type |
| ---------- | ---------- |
| `lpushx` | `(key: any, elements: any[]) => Promise<number>` |

Parameters:

* `key`: - The key of the list.
* `elements`: - The elements to insert at the head of the list stored at `key`.


Examples:

```typescript
const listLength = await client.lpushx("my_list", ["value1", "value2"]);
console.log(result); // Output: 2 - Indicates that the list has two elements.
```


#### :gear: lpop

Removes and returns the first elements of the list stored at `key`.
The command pops a single element from the beginning of the list.

| Method | Type |
| ---------- | ---------- |
| `lpop` | `(key: any, options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `key`: - The key of the list.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of the lpop method with an existing list
const result = await client.lpop("my_list");
console.log(result); // Output: 'value1'
```
```typescript
// Example usage of the lpop method with a non-existing list
const result = await client.lpop("non_exiting_key");
console.log(result); // Output: null
```


#### :gear: lpopCount

Removes and returns up to `count` elements of the list stored at `key`, depending on the list's length.

| Method | Type |
| ---------- | ---------- |
| `lpopCount` | `(key: any, count: number, options?: DecoderOption or undefined) => Promise<any[] or null>` |

Parameters:

* `key`: - The key of the list.
* `count`: - The count of the elements to pop from the list.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of the lpopCount method with an existing list
const result = await client.lpopCount("my_list", 2);
console.log(result); // Output: ["value1", "value2"]
```
```typescript
// Example usage of the lpopCount method with a non-existing list
const result = await client.lpopCount("non_exiting_key", 3);
console.log(result); // Output: null
```


#### :gear: lrange

Returns the specified elements of the list stored at `key`.
The offsets `start` and `end` are zero-based indexes, with 0 being the first element of the list, 1 being the next element and so on.
These offsets can also be negative numbers indicating offsets starting at the end of the list,
with -1 being the last element of the list, -2 being the penultimate, and so on.

| Method | Type |
| ---------- | ---------- |
| `lrange` | `(key: any, start: number, end: number, options?: DecoderOption or undefined) => Promise<any[]>` |

Parameters:

* `key`: - The key of the list.
* `start`: - The starting point of the range.
* `end`: - The end of the range.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of the lrange method with an existing list and positive indices
const result = await client.lrange("my_list", 0, 2);
console.log(result); // Output: ["value1", "value2", "value3"]
```
```typescript
// Example usage of the lrange method with an existing list and negative indices
const result = await client.lrange("my_list", -2, -1);
console.log(result); // Output: ["value2", "value3"]
```
```typescript
// Example usage of the lrange method with a non-existing list
const result = await client.lrange("non_exiting_key", 0, 2);
console.log(result); // Output: []
```


#### :gear: llen

Returns the length of the list stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `llen` | `(key: any) => Promise<number>` |

Parameters:

* `key`: - The key of the list.


Examples:

```typescript
// Example usage of the llen method
const result = await client.llen("my_list");
console.log(result); // Output: 3 - Indicates that there are 3 elements in the list.
```


#### :gear: lmove

Atomically pops and removes the left/right-most element to the list stored at `source`
depending on `whereTo`, and pushes the element at the first/last element of the list
stored at `destination` depending on `whereFrom`, see {@link ListDirection}.

| Method | Type |
| ---------- | ---------- |
| `lmove` | `(source: any, destination: any, whereFrom: ListDirection, whereTo: ListDirection, options?: DecoderOption or undefined) => Promise<...>` |

Parameters:

* `source`: - The key to the source list.
* `destination`: - The key to the destination list.
* `whereFrom`: - The 
* `whereTo`: - The 
* `options`: - (Optional) See 


Examples:

```typescript
await client.lpush("testKey1", ["two", "one"]);
await client.lpush("testKey2", ["four", "three"]);

const result1 = await client.lmove("testKey1", "testKey2", ListDirection.LEFT, ListDirection.LEFT);
console.log(result1); // Output: "one".

const updated_array_key1 = await client.lrange("testKey1", 0, -1);
console.log(updated_array); // Output: "two".

const updated_array_key2 = await client.lrange("testKey2", 0, -1);
console.log(updated_array_key2); // Output: ["one", "three", "four"].
```


#### :gear: blmove

Blocks the connection until it pops atomically and removes the left/right-most element to the
list stored at `source` depending on `whereFrom`, and pushes the element at the first/last element
of the list stored at `destination` depending on `whereTo`.
`BLMOVE` is the blocking variant of {@link lmove}.

| Method | Type |
| ---------- | ---------- |
| `blmove` | `(source: any, destination: any, whereFrom: ListDirection, whereTo: ListDirection, timeout: number, options?: DecoderOption or undefined) => Promise<...>` |

Parameters:

* `source`: - The key to the source list.
* `destination`: - The key to the destination list.
* `whereFrom`: - The 
* `whereTo`: - The 
* `timeout`: - The number of seconds to wait for a blocking operation to complete. A value of `0` will block indefinitely.
* `options`: - (Optional) See 


Examples:

```typescript
await client.lpush("testKey1", ["two", "one"]);
await client.lpush("testKey2", ["four", "three"]);
const result = await client.blmove("testKey1", "testKey2", ListDirection.LEFT, ListDirection.LEFT, 0.1);
console.log(result); // Output: "one"

const result2 = await client.lrange("testKey1", 0, -1);
console.log(result2);   // Output: "two"

const updated_array2 = await client.lrange("testKey2", 0, -1);
console.log(updated_array2); // Output: ["one", "three", "four"]
```


#### :gear: lset

Sets the list element at `index` to `element`.
The index is zero-based, so `0` means the first element, `1` the second element and so on.
Negative indices can be used to designate elements starting at the tail of
the list. Here, `-1` means the last element, `-2` means the penultimate and so forth.

| Method | Type |
| ---------- | ---------- |
| `lset` | `(key: any, index: number, element: any) => Promise<"OK">` |

Parameters:

* `key`: - The key of the list.
* `index`: - The index of the element in the list to be set.
* `element`: - The new element to set at the specified index.


Examples:

```typescript
// Example usage of the lset method
const response = await client.lset("test_key", 1, "two");
console.log(response); // Output: 'OK' - Indicates that the second index of the list has been set to "two".
```


#### :gear: ltrim

Trim an existing list so that it will contain only the specified range of elements specified.
The offsets `start` and `end` are zero-based indexes, with 0 being the first element of the list, 1 being the next element and so on.
These offsets can also be negative numbers indicating offsets starting at the end of the list,
with -1 being the last element of the list, -2 being the penultimate, and so on.

| Method | Type |
| ---------- | ---------- |
| `ltrim` | `(key: any, start: number, end: number) => Promise<"OK">` |

Parameters:

* `key`: - The key of the list.
* `start`: - The starting point of the range.
* `end`: - The end of the range.


Examples:

```typescript
// Example usage of the ltrim method
const result = await client.ltrim("my_list", 0, 1);
console.log(result); // Output: 'OK' - Indicates that the list has been trimmed to contain elements from 0 to 1.
```


#### :gear: lrem

Removes the first `count` occurrences of elements equal to `element` from the list stored at `key`.
If `count` is positive : Removes elements equal to `element` moving from head to tail.
If `count` is negative : Removes elements equal to `element` moving from tail to head.
If `count` is 0 or `count` is greater than the occurrences of elements equal to `element`: Removes all elements equal to `element`.

| Method | Type |
| ---------- | ---------- |
| `lrem` | `(key: any, count: number, element: any) => Promise<number>` |

Parameters:

* `key`: - The key of the list.
* `count`: - The count of the occurrences of elements equal to `element` to remove.
* `element`: - The element to remove from the list.


Examples:

```typescript
// Example usage of the lrem method
const result = await client.lrem("my_list", 2, "value");
console.log(result); // Output: 2 - Removes the first 2 occurrences of "value" in the list.
```


#### :gear: rpush

Inserts all the specified values at the tail of the list stored at `key`.
`elements` are inserted one after the other to the tail of the list, from the leftmost element to the rightmost element.
If `key` does not exist, it is created as empty list before performing the push operations.

| Method | Type |
| ---------- | ---------- |
| `rpush` | `(key: any, elements: any[]) => Promise<number>` |

Parameters:

* `key`: - The key of the list.
* `elements`: - The elements to insert at the tail of the list stored at `key`.


Examples:

```typescript
// Example usage of the rpush method with an existing list
const result = await client.rpush("my_list", ["value2", "value3"]);
console.log(result); // Output: 3 - Indicates that the new length of the list is 3 after the push operation.
```
```typescript
// Example usage of the rpush method with a non-existing list
const result = await client.rpush("nonexistent_list", ["new_value"]);
console.log(result); // Output: 1
```


#### :gear: rpushx

Inserts specified values at the tail of the `list`, only if `key` already
exists and holds a list.

| Method | Type |
| ---------- | ---------- |
| `rpushx` | `(key: any, elements: any[]) => Promise<number>` |

Parameters:

* `key`: - The key of the list.
* `elements`: - The elements to insert at the tail of the list stored at `key`.


Examples:

```typescript
const result = await client.rpushx("my_list", ["value1", "value2"]);
console.log(result);  // Output: 2 - Indicates that the list has two elements.
```


#### :gear: rpop

Removes and returns the last elements of the list stored at `key`.
The command pops a single element from the end of the list.

| Method | Type |
| ---------- | ---------- |
| `rpop` | `(key: any, options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `key`: - The key of the list.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of the rpop method with an existing list
const result = await client.rpop("my_list");
console.log(result); // Output: 'value1'
```
```typescript
// Example usage of the rpop method with a non-existing list
const result = await client.rpop("non_exiting_key");
console.log(result); // Output: null
```


#### :gear: rpopCount

Removes and returns up to `count` elements from the list stored at `key`, depending on the list's length.

| Method | Type |
| ---------- | ---------- |
| `rpopCount` | `(key: any, count: number, options?: DecoderOption or undefined) => Promise<any[] or null>` |

Parameters:

* `key`: - The key of the list.
* `count`: - The count of the elements to pop from the list.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of the rpopCount method with an existing list
const result = await client.rpopCount("my_list", 2);
console.log(result); // Output: ["value1", "value2"]
```
```typescript
// Example usage of the rpopCount method with a non-existing list
const result = await client.rpopCount("non_exiting_key", 7);
console.log(result); // Output: null
```


#### :gear: sadd

Adds the specified members to the set stored at `key`. Specified members that are already a member of this set are ignored.
If `key` does not exist, a new set is created before adding `members`.

| Method | Type |
| ---------- | ---------- |
| `sadd` | `(key: any, members: any[]) => Promise<number>` |

Parameters:

* `key`: - The key to store the members to its set.
* `members`: - A list of members to add to the set stored at `key`.


Examples:

```typescript
// Example usage of the sadd method with an existing set
const result = await client.sadd("my_set", ["member1", "member2"]);
console.log(result); // Output: 2
```


#### :gear: srem

Removes the specified members from the set stored at `key`. Specified members that are not a member of this set are ignored.

| Method | Type |
| ---------- | ---------- |
| `srem` | `(key: any, members: any[]) => Promise<number>` |

Parameters:

* `key`: - The key to remove the members from its set.
* `members`: - A list of members to remove from the set stored at `key`.


Examples:

```typescript
// Example usage of the srem method
const result = await client.srem("my_set", ["member1", "member2"]);
console.log(result); // Output: 2
```


#### :gear: sscan

Iterates incrementally over a set.

| Method | Type |
| ---------- | ---------- |
| `sscan` | `(key: any, cursor: any, options?: (BaseScanOptions and DecoderOption) or undefined) => Promise<[any, any[]]>` |

Parameters:

* `key`: - The key of the set.
* `cursor`: - The cursor that points to the next iteration of results. A value of `"0"` indicates the start of the search.
* `options`: - (Optional) See 


Examples:

```typescript
// Assume key contains a set with 200 members
let newCursor = "0";
let result = [];

do {
     result = await client.sscan(key1, newCursor, {
     match: "*",
     count: 5,
});
     newCursor = result[0];
     console.log("Cursor: ", newCursor);
     console.log("Members: ", result[1]);
} while (newCursor !== "0");

// The output of the code above is something similar to:
// Cursor:  8, Match: "f*"
// Members:  ['field', 'fur', 'fun', 'fame']
// Cursor:  20, Count: 3
// Members:  ['1', '2', '3', '4', '5', '6']
// Cursor:  0
// Members:  ['1', '2', '3', '4', '5', '6']
```


#### :gear: smembers

Returns all the members of the set value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `smembers` | `(key: any, options?: DecoderOption or undefined) => Promise<Set<any>>` |

Parameters:

* `key`: - The key to return its members.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of the smembers method
const result = await client.smembers("my_set");
console.log(result); // Output: Set {'member1', 'member2', 'member3'}
```


#### :gear: smove

Moves `member` from the set at `source` to the set at `destination`, removing it from the source set.
Creates a new destination set if needed. The operation is atomic.

| Method | Type |
| ---------- | ---------- |
| `smove` | `(source: any, destination: any, member: any) => Promise<boolean>` |

Parameters:

* `source`: - The key of the set to remove the element from.
* `destination`: - The key of the set to add the element to.
* `member`: - The set element to move.


Examples:

```typescript
const result = await client.smove("set1", "set2", "member1");
console.log(result); // Output: true - "member1" was moved from "set1" to "set2".
```


#### :gear: scard

Returns the set cardinality (number of elements) of the set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `scard` | `(key: any) => Promise<number>` |

Parameters:

* `key`: - The key to return the number of its members.


Examples:

```typescript
// Example usage of the scard method
const result = await client.scard("my_set");
console.log(result); // Output: 3
```


#### :gear: sinter

Gets the intersection of all the given sets.

| Method | Type |
| ---------- | ---------- |
| `sinter` | `(keys: any[], options?: DecoderOption or undefined) => Promise<Set<any>>` |

Parameters:

* `keys`: - The `keys` of the sets to get the intersection.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of sinter method when member exists
const result = await client.sinter(["my_set1", "my_set2"]);
console.log(result); // Output: Set {'member2'} - Indicates that sets have one common member
```
```typescript
// Example usage of sinter method with non-existing key
const result = await client.sinter(["my_set", "non_existing_key"]);
console.log(result); // Output: Set {} - An empty set is returned since the key does not exist.
```


#### :gear: sintercard

Gets the cardinality of the intersection of all the given sets.

| Method | Type |
| ---------- | ---------- |
| `sintercard` | `(keys: any[], options?: { limit?: number or undefined; } or undefined) => Promise<number>` |

Parameters:

* `keys`: - The keys of the sets.
* `options`: - (Optional) Additional parameters:
- (Optional) `limit`: the limit for the intersection cardinality value. If not specified, or set to `0`, no limit is used.


Examples:

```typescript
await client.sadd("set1", ["a", "b", "c"]);
await client.sadd("set2", ["b", "c", "d"]);
const result1 = await client.sintercard(["set1", "set2"]);
console.log(result1); // Output: 2 - The intersection of "set1" and "set2" contains 2 elements: "b" and "c".

const result2 = await client.sintercard(["set1", "set2"], { limit: 1 });
console.log(result2); // Output: 1 - The computation stops early as the intersection cardinality reaches the limit of 1.
```


#### :gear: sinterstore

Stores the members of the intersection of all given sets specified by `keys` into a new set at `destination`.

| Method | Type |
| ---------- | ---------- |
| `sinterstore` | `(destination: any, keys: any[]) => Promise<number>` |

Parameters:

* `destination`: - The key of the destination set.
* `keys`: - The keys from which to retrieve the set members.


Examples:

```typescript
const result = await client.sinterstore("my_set", ["set1", "set2"]);
console.log(result); // Output: 2 - Two elements were stored at "my_set", and those elements are the intersection of "set1" and "set2".
```


#### :gear: sdiff

Computes the difference between the first set and all the successive sets in `keys`.

| Method | Type |
| ---------- | ---------- |
| `sdiff` | `(keys: any[], options?: DecoderOption or undefined) => Promise<Set<any>>` |

Parameters:

* `keys`: - The keys of the sets to diff.
* `options`: - (Optional) See 


Examples:

```typescript
await client.sadd("set1", ["member1", "member2"]);
await client.sadd("set2", ["member1"]);
const result = await client.sdiff(["set1", "set2"]);
console.log(result); // Output: Set {"member1"} - "member2" is in "set1" but not "set2"
```


#### :gear: sdiffstore

Stores the difference between the first set and all the successive sets in `keys` into a new set at `destination`.

| Method | Type |
| ---------- | ---------- |
| `sdiffstore` | `(destination: any, keys: any[]) => Promise<number>` |

Parameters:

* `destination`: - The key of the destination set.
* `keys`: - The keys of the sets to diff.


Examples:

```typescript
await client.sadd("set1", ["member1", "member2"]);
await client.sadd("set2", ["member1"]);
const result = await client.sdiffstore("set3", ["set1", "set2"]);
console.log(result); // Output: 1 - One member was stored in "set3", and that member is the diff between "set1" and "set2".
```


#### :gear: sunion

Gets the union of all the given sets.

| Method | Type |
| ---------- | ---------- |
| `sunion` | `(keys: any[], options?: DecoderOption or undefined) => Promise<Set<any>>` |

Parameters:

* `keys`: - The keys of the sets.
* `options`: - (Optional) See 


Examples:

```typescript
await client.sadd("my_set1", ["member1", "member2"]);
await client.sadd("my_set2", ["member2", "member3"]);
const result1 = await client.sunion(["my_set1", "my_set2"]);
console.log(result1); // Output: Set {'member1', 'member2', 'member3'} - Sets "my_set1" and "my_set2" have three unique members.

const result2 = await client.sunion(["my_set1", "non_existing_set"]);
console.log(result2); // Output: Set {'member1', 'member2'}
```


#### :gear: sunionstore

Stores the members of the union of all given sets specified by `keys` into a new set
at `destination`.

| Method | Type |
| ---------- | ---------- |
| `sunionstore` | `(destination: any, keys: any[]) => Promise<number>` |

Parameters:

* `destination`: - The key of the destination set.
* `keys`: - The keys from which to retrieve the set members.


Examples:

```typescript
const length = await client.sunionstore("mySet", ["set1", "set2"]);
console.log(length); // Output: 2 - Two elements were stored in "mySet", and those two members are the union of "set1" and "set2".
```


#### :gear: sismember

Returns if `member` is a member of the set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `sismember` | `(key: any, member: any) => Promise<boolean>` |

Parameters:

* `key`: - The key of the set.
* `member`: - The member to check for existence in the set.


Examples:

```typescript
// Example usage of the sismember method when member exists
const result = await client.sismember("my_set", "member1");
console.log(result); // Output: true - Indicates that "member1" exists in the set "my_set".
```
```typescript
// Example usage of the sismember method when member does not exist
const result = await client.sismember("my_set", "non_existing_member");
console.log(result); // Output: false - Indicates that "non_existing_member" does not exist in the set "my_set".
```


#### :gear: smismember

Checks whether each member is contained in the members of the set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `smismember` | `(key: any, members: any[]) => Promise<boolean[]>` |

Parameters:

* `key`: - The key of the set to check.
* `members`: - A list of members to check for existence in the set.


Examples:

```typescript
await client.sadd("set1", ["a", "b", "c"]);
const result = await client.smismember("set1", ["b", "c", "d"]);
console.log(result); // Output: [true, true, false] - "b" and "c" are members of "set1", but "d" is not.
```


#### :gear: spop

Removes and returns one random member from the set value store at `key`.
To pop multiple members, see {@link spopCount}.

| Method | Type |
| ---------- | ---------- |
| `spop` | `(key: any, options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `key`: - The key of the set.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of spop method to remove and return a random member from a set
const result = await client.spop("my_set");
console.log(result); // Output: 'member1' - Removes and returns a random member from the set "my_set".
```
```typescript
// Example usage of spop method with non-existing key
const result = await client.spop("non_existing_key");
console.log(result); // Output: null
```


#### :gear: spopCount

Removes and returns up to `count` random members from the set value store at `key`, depending on the set's length.

| Method | Type |
| ---------- | ---------- |
| `spopCount` | `(key: any, count: number, options?: DecoderOption or undefined) => Promise<Set<any>>` |

Parameters:

* `key`: - The key of the set.
* `count`: - The count of the elements to pop from the set.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of spopCount method to remove and return multiple random members from a set
const result = await client.spopCount("my_set", 2);
console.log(result); // Output: Set {'member2', 'member3'} - Removes and returns 2 random members from the set "my_set".
```
```typescript
// Example usage of spopCount method with non-existing key
const result = await client.spopCount("non_existing_key");
console.log(result); // Output: Set {} - An empty set is returned since the key does not exist.
```


#### :gear: srandmember

Returns a random element from the set value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `srandmember` | `(key: any, options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `key`: - The key from which to retrieve the set member.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of srandmember method to return a random member from a set
const result = await client.srandmember("my_set");
console.log(result); // Output: 'member1' - A random member of "my_set".
```
```typescript
// Example usage of srandmember method with non-existing key
const result = await client.srandmember("non_existing_set");
console.log(result); // Output: null
```


#### :gear: srandmemberCount

Returns one or more random elements from the set value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `srandmemberCount` | `(key: any, count: number, options?: DecoderOption or undefined) => Promise<any[]>` |

Parameters:

* `key`: - The key of the sorted set.
* `count`: - The number of members to return.
  If `count` is positive, returns unique members.
  If `count` is negative, allows for duplicates members.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of srandmemberCount method to return multiple random members from a set
const result = await client.srandmemberCount("my_set", -3);
console.log(result); // Output: ['member1', 'member1', 'member2'] - Random members of "my_set".
```
```typescript
// Example usage of srandmemberCount method with non-existing key
const result = await client.srandmemberCount("non_existing_set", 3);
console.log(result); // Output: [] - An empty list since the key does not exist.
```


#### :gear: exists

Returns the number of keys in `keys` that exist in the database.

| Method | Type |
| ---------- | ---------- |
| `exists` | `(keys: any[]) => Promise<number>` |

Parameters:

* `keys`: - The keys list to check.


Examples:

```typescript
// Example usage of the exists method
const result = await client.exists(["key1", "key2", "key3"]);
console.log(result); // Output: 3 - Indicates that all three keys exist in the database.
```


#### :gear: unlink

Removes the specified keys. A key is ignored if it does not exist.
This command, similar to {@link del}, removes specified keys and ignores non-existent ones.
However, this command does not block the server, while {@link https://valkey.io/commands/del `DEL`} does.

| Method | Type |
| ---------- | ---------- |
| `unlink` | `(keys: any[]) => Promise<number>` |

Parameters:

* `keys`: - The keys we wanted to unlink.


Examples:

```typescript
// Example usage of the unlink method
const result = await client.unlink(["key1", "key2", "key3"]);
console.log(result); // Output: 3 - Indicates that all three keys were unlinked from the database.
```


#### :gear: expire

Sets a timeout on `key` in seconds. After the timeout has expired, the key will automatically be deleted.
If `key` already has an existing expire set, the time to live is updated to the new value.
If `seconds` is non-positive number, the key will be deleted rather than expired.
The timeout will only be cleared by commands that delete or overwrite the contents of `key`.

| Method | Type |
| ---------- | ---------- |
| `expire` | `(key: any, seconds: number, options?: { expireOption?: ExpireOptions or undefined; } or undefined) => Promise<boolean>` |

Parameters:

* `key`: - The key to set timeout on it.
* `seconds`: - The timeout in seconds.
* `options`: - (Optional) Additional parameters:
- (Optional) `expireOption`: the expire option - see 


Examples:

```typescript
// Example usage of the expire method
const result = await client.expire("my_key", 60);
console.log(result); // Output: true - Indicates that a timeout of 60 seconds has been set for "my_key".
```
```typescript
// Example usage of the expire method with exisiting expiry
const result = await client.expire("my_key", 60, { expireOption: ExpireOptions.HasNoExpiry });
console.log(result); // Output: false - Indicates that "my_key" has an existing expiry.
```


#### :gear: expireAt

Sets a timeout on `key`. It takes an absolute Unix timestamp (seconds since January 1, 1970) instead of specifying the number of seconds.
A timestamp in the past will delete the key immediately. After the timeout has expired, the key will automatically be deleted.
If `key` already has an existing expire set, the time to live is updated to the new value.
The timeout will only be cleared by commands that delete or overwrite the contents of `key`.

| Method | Type |
| ---------- | ---------- |
| `expireAt` | `(key: any, unixSeconds: number, options?: { expireOption?: ExpireOptions or undefined; } or undefined) => Promise<boolean>` |

Parameters:

* `key`: - The key to set timeout on it.
* `unixSeconds`: - The timeout in an absolute Unix timestamp.
* `options`: - (Optional) Additional parameters:
- (Optional) `expireOption`: the expire option - see 


Examples:

```typescript
// Example usage of the expireAt method on a key with no previous expiry
const result = await client.expireAt("my_key", 1672531200, { expireOption: ExpireOptions.HasNoExpiry });
console.log(result); // Output: true - Indicates that the expiration time for "my_key" was successfully set.
```


#### :gear: expiretime

Returns the absolute Unix timestamp (since January 1, 1970) at which the given `key` will expire, in seconds.
To get the expiration with millisecond precision, use {@link pexpiretime}.

| Method | Type |
| ---------- | ---------- |
| `expiretime` | `(key: any) => Promise<number>` |

Parameters:

* `key`: - The `key` to determine the expiration value of.


Examples:

```typescript
const result1 = await client.expiretime("myKey");
console.log(result1); // Output: -2 - myKey doesn't exist.

const result2 = await client.set(myKey, "value");
const result3 = await client.expireTime(myKey);
console.log(result2); // Output: -1 - myKey has no associated expiration.

client.expire(myKey, 60);
const result3 = await client.expireTime(myKey);
console.log(result3); // Output: 123456 - the Unix timestamp (in seconds) when "myKey" will expire.
```


#### :gear: pexpire

Sets a timeout on `key` in milliseconds. After the timeout has expired, the key will automatically be deleted.
If `key` already has an existing expire set, the time to live is updated to the new value.
If `milliseconds` is non-positive number, the key will be deleted rather than expired.
The timeout will only be cleared by commands that delete or overwrite the contents of `key`.

| Method | Type |
| ---------- | ---------- |
| `pexpire` | `(key: any, milliseconds: number, options?: { expireOption?: ExpireOptions or undefined; } or undefined) => Promise<boolean>` |

Parameters:

* `key`: - The key to set timeout on it.
* `milliseconds`: - The timeout in milliseconds.
* `options`: - (Optional) Additional parameters:
- (Optional) `expireOption`: the expire option - see 


Examples:

```typescript
// Example usage of the pexpire method on a key with no previous expiry
const result = await client.pexpire("my_key", 60000, { expireOption: ExpireOptions.HasNoExpiry });
console.log(result); // Output: true - Indicates that a timeout of 60,000 milliseconds has been set for "my_key".
```


#### :gear: pexpireAt

Sets a timeout on `key`. It takes an absolute Unix timestamp (milliseconds since January 1, 1970) instead of specifying the number of milliseconds.
A timestamp in the past will delete the key immediately. After the timeout has expired, the key will automatically be deleted.
If `key` already has an existing expire set, the time to live is updated to the new value.
The timeout will only be cleared by commands that delete or overwrite the contents of `key`.

| Method | Type |
| ---------- | ---------- |
| `pexpireAt` | `(key: any, unixMilliseconds: number, options?: { expireOption?: ExpireOptions or undefined; } or undefined) => Promise<number>` |

Parameters:

* `key`: - The key to set timeout on it.
* `unixMilliseconds`: - The timeout in an absolute Unix timestamp.
* `options`: - (Optional) Additional parameters:
- (Optional) `expireOption`: the expire option - see 


Examples:

```typescript
// Example usage of the pexpireAt method on a key with no previous expiry
const result = await client.pexpireAt("my_key", 1672531200000, { expireOption: ExpireOptions.HasNoExpiry });
console.log(result); // Output: true - Indicates that the expiration time for "my_key" was successfully set.
```


#### :gear: pexpiretime

Returns the absolute Unix timestamp (since January 1, 1970) at which the given `key` will expire, in milliseconds.

| Method | Type |
| ---------- | ---------- |
| `pexpiretime` | `(key: any) => Promise<number>` |

Parameters:

* `key`: - The `key` to determine the expiration value of.


Examples:

```typescript
const result1 = client.pexpiretime("myKey");
console.log(result1); // Output: -2 - myKey doesn't exist.

const result2 = client.set(myKey, "value");
const result3 = client.pexpireTime(myKey);
console.log(result2); // Output: -1 - myKey has no associated expiration.

client.expire(myKey, 60);
const result3 = client.pexpireTime(myKey);
console.log(result3); // Output: 123456789 - the Unix timestamp (in milliseconds) when "myKey" will expire.
```


#### :gear: ttl

Returns the remaining time to live of `key` that has a timeout.

| Method | Type |
| ---------- | ---------- |
| `ttl` | `(key: any) => Promise<number>` |

Parameters:

* `key`: - The key to return its timeout.


Examples:

```typescript
// Example usage of the ttl method with existing key
const result = await client.ttl("my_key");
console.log(result); // Output: 3600 - Indicates that "my_key" has a remaining time to live of 3600 seconds.
```
```typescript
// Example usage of the ttl method with existing key that has no associated expire.
const result = await client.ttl("key");
console.log(result); // Output: -1 - Indicates that the key has no associated expire.
```
```typescript
// Example usage of the ttl method with a non-existing key
const result = await client.ttl("nonexistent_key");
console.log(result); // Output: -2 - Indicates that the key doesn't exist.
```


#### :gear: invokeScript

Invokes a Lua script with its keys and arguments.
This method simplifies the process of invoking scripts on a Valkey server by using an object that represents a Lua script.
The script loading, argument preparation, and execution will all be handled internally. If the script has not already been loaded,
it will be loaded automatically using the `SCRIPT LOAD` command. After that, it will be invoked using the `EVALSHA` command.

| Method | Type |
| ---------- | ---------- |
| `invokeScript` | `(script: Script, options?: ({ keys?: any[] or undefined; args?: any[] or undefined; } and DecoderOption) or undefined) => Promise<any>` |

Parameters:

* `script`: - The Lua script to execute.
* `options`: - (Optional) Additional parameters:
- (Optional) `keys` : the keys that are used in the script.
- (Optional) `args`: the arguments for the script.
- (Optional) `decoder`: see 


Examples:

```typescript
const luaScript = new Script("return { KEYS[1], ARGV[1] }");
const scriptOptions = {
     keys: ["foo"],
     args: ["bar"],
};
const result = await invokeScript(luaScript, scriptOptions);
console.log(result); // Output: ['foo', 'bar']
```


#### :gear: scriptShow

Returns the original source code of a script in the script cache.

| Method | Type |
| ---------- | ---------- |
| `scriptShow` | `(sha1: any, options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `sha1`: - The SHA1 digest of the script.
* `options`: - (Optional) See 


Examples:

```typescript
const scriptHash = script.getHash();
const scriptSource = await client.scriptShow(scriptHash);
console.log(scriptSource); // Output: "return { KEYS[1], ARGV[1] }"
```


#### :gear: xrange

Returns stream entries matching a given range of entry IDs.

| Method | Type |
| ---------- | ---------- |
| `xrange` | `(key: any, start: Boundary<string>, end: Boundary<string>, options?: ({ count?: number or undefined; } and DecoderOption) or undefined) => Promise<StreamEntryDataType or null>` |

Parameters:

* `key`: - The key of the stream.
* `start`: - The starting stream entry ID bound for the range.
- Use `value` to specify a stream entry ID.
- Use `isInclusive: false` to specify an exclusive bounded stream entry ID. This is only available starting with Valkey version 6.2.0.
- Use `InfBoundary.NegativeInfinity` to start with the minimum available ID.
* `end`: - The ending stream entry ID bound for the range.
- Use `value` to specify a stream entry ID.
- Use `isInclusive: false` to specify an exclusive bounded stream entry ID. This is only available starting with Valkey version 6.2.0.
- Use `InfBoundary.PositiveInfinity` to end with the maximum available ID.
* `options`: - (Optional) Additional parameters:
- (Optional) `count`: the maximum count of stream entries to return.
If `count` is not provided, all stream entries in the range will be returned.
- (Optional) `decoder`: see 


Examples:

```typescript
await client.xadd("mystream", [["field1", "value1"]], {id: "0-1"});
await client.xadd("mystream", [["field2", "value2"], ["field2", "value3"]], {id: "0-2"});
console.log(await client.xrange("mystream", InfBoundary.NegativeInfinity, InfBoundary.PositiveInfinity));
// Output:
// {
//     "0-1": [["field1", "value1"]],
//     "0-2": [["field2", "value2"], ["field2", "value3"]],
// } // Indicates the stream entry IDs and their associated field-value pairs for all stream entries in "mystream".
```


#### :gear: xrevrange

Returns stream entries matching a given range of entry IDs in reverse order. Equivalent to {@link xrange} but returns the
entries in reverse order.

| Method | Type |
| ---------- | ---------- |
| `xrevrange` | `(key: any, end: Boundary<string>, start: Boundary<string>, options?: ({ count?: number or undefined; } and DecoderOption) or undefined) => Promise<StreamEntryDataType or null>` |

Parameters:

* `key`: - The key of the stream.
* `end`: - The ending stream entry ID bound for the range.
- Use `value` to specify a stream entry ID.
- Use `isInclusive: false` to specify an exclusive bounded stream entry ID. This is only available starting with Valkey version 6.2.0.
- Use `InfBoundary.PositiveInfinity` to end with the maximum available ID.
* `start`: - The ending stream ID bound for the range.
- Use `value` to specify a stream entry ID.
- Use `isInclusive: false` to specify an exclusive bounded stream entry ID. This is only available starting with Valkey version 6.2.0.
- Use `InfBoundary.NegativeInfinity` to start with the minimum available ID.
* `options`: - (Optional) Additional parameters:
- (Optional) `count`: the maximum count of stream entries to return.
If `count` is not provided, all stream entries in the range will be returned.
- (Optional) `decoder`: see 


Examples:

```typescript
await client.xadd("mystream", [["field1", "value1"]], {id: "0-1"});
await client.xadd("mystream", [["field2", "value2"], ["field2", "value3"]], {id: "0-2"});
console.log(await client.xrevrange("mystream", InfBoundary.PositiveInfinity, InfBoundary.NegativeInfinity));
// Output:
// {
//     "0-2": [["field2", "value2"], ["field2", "value3"]],
//     "0-1": [["field1", "value1"]],
// } // Indicates the stream entry IDs and their associated field-value pairs for all stream entries in "mystream".
```


#### :gear: zadd

Adds members with their scores to the sorted set stored at `key`.
If a member is already a part of the sorted set, its score is updated.

| Method | Type |
| ---------- | ---------- |
| `zadd` | `(key: any, membersAndScores: SortedSetDataType or Record<string, number>, options?: ZAddOptions or undefined) => Promise<number>` |

Parameters:

* `key`: - The key of the sorted set.
* `membersAndScores`: - A list of members and their corresponding scores or a mapping of members to their corresponding scores.
* `options`: - (Optional) The `ZADD` options - see 


Examples:

```typescript
// Example usage of the zadd method to add elements to a sorted set
const data = [{ element: "member1", score: 10.5 }, { element: "member2", score: 8.2 }]
const result = await client.zadd("my_sorted_set", data);
console.log(result); // Output: 2 - Indicates that two elements have been added to the sorted set "my_sorted_set."
```
```typescript
// Example usage of the zadd method to update scores in an existing sorted set
const options = { conditionalChange: ConditionalChange.ONLY_IF_EXISTS, changed: true };
const result = await client.zadd("existing_sorted_set", { "member1": 10.5, "member2": 8.2 }, options);
console.log(result); // Output: 2 - Updates the scores of two existing members in the sorted set "existing_sorted_set."
```


#### :gear: zaddIncr

Increments the score of member in the sorted set stored at `key` by `increment`.
If `member` does not exist in the sorted set, it is added with `increment` as its score (as if its previous score was 0.0).
If `key` does not exist, a new sorted set with the specified member as its sole member is created.

| Method | Type |
| ---------- | ---------- |
| `zaddIncr` | `(key: any, member: any, increment: number, options?: ZAddOptions or undefined) => Promise<number or null>` |

Parameters:

* `key`: - The key of the sorted set.
* `member`: - A member in the sorted set to increment score to.
* `increment`: - The score to increment the member.
* `options`: - (Optional) The `ZADD` options - see 


Examples:

```typescript
// Example usage of the zaddIncr method to add a member with a score to a sorted set
const result = await client.zaddIncr("my_sorted_set", member, 5.0);
console.log(result); // Output: 5.0
```
```typescript
// Example usage of the zaddIncr method to add or update a member with a score in an existing sorted set
const result = await client.zaddIncr("existing_sorted_set", member, "3.0", { updateOptions: UpdateByScore.LESS_THAN });
console.log(result); // Output: null - Indicates that the member in the sorted set haven't been updated.
```


#### :gear: zrem

Removes the specified members from the sorted set stored at `key`.
Specified members that are not a member of this set are ignored.

| Method | Type |
| ---------- | ---------- |
| `zrem` | `(key: any, members: any[]) => Promise<number>` |

Parameters:

* `key`: - The key of the sorted set.
* `members`: - A list of members to remove from the sorted set.


Examples:

```typescript
// Example usage of the zrem function to remove members from a sorted set
const result = await client.zrem("my_sorted_set", ["member1", "member2"]);
console.log(result); // Output: 2 - Indicates that two members have been removed from the sorted set "my_sorted_set."
```
```typescript
// Example usage of the zrem function when the sorted set does not exist
const result = await client.zrem("non_existing_sorted_set", ["member1", "member2"]);
console.log(result); // Output: 0 - Indicates that no members were removed as the sorted set "non_existing_sorted_set" does not exist.
```


#### :gear: zcard

Returns the cardinality (number of elements) of the sorted set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `zcard` | `(key: any) => Promise<number>` |

Parameters:

* `key`: - The key of the sorted set.


Examples:

```typescript
// Example usage of the zcard method to get the cardinality of a sorted set
const result = await client.zcard("my_sorted_set");
console.log(result); // Output: 3 - Indicates that there are 3 elements in the sorted set "my_sorted_set".
```
```typescript
// Example usage of the zcard method with a non-existing key
const result = await client.zcard("non_existing_key");
console.log(result); // Output: 0
```


#### :gear: zintercard

Returns the cardinality of the intersection of the sorted sets specified by `keys`.

| Method | Type |
| ---------- | ---------- |
| `zintercard` | `(keys: any[], options?: { limit?: number or undefined; } or undefined) => Promise<number>` |

Parameters:

* `keys`: - The keys of the sorted sets to intersect.
* `options`: - (Optional) Additional parameters:
- (Optional) `limit`: the limit for the intersection cardinality value. If not specified, or set to `0`, no limit is used.


Examples:

```typescript
const cardinality = await client.zintercard(["key1", "key2"], { limit: 10 });
console.log(cardinality); // Output: 3 - The intersection of the sorted sets at "key1" and "key2" has a cardinality of 3.
```


#### :gear: zdiff

Returns the difference between the first sorted set and all the successive sorted sets.
To get the elements with their scores, see {@link zdiffWithScores}.

| Method | Type |
| ---------- | ---------- |
| `zdiff` | `(keys: any[], options?: DecoderOption or undefined) => Promise<any[]>` |

Parameters:

* `keys`: - The keys of the sorted sets.
* `options`: - (Optional) See 


Examples:

```typescript
await client.zadd("zset1", {"member1": 1.0, "member2": 2.0, "member3": 3.0});
await client.zadd("zset2", {"member2": 2.0});
await client.zadd("zset3", {"member3": 3.0});
const result = await client.zdiff(["zset1", "zset2", "zset3"]);
console.log(result); // Output: ["member1"] - "member1" is in "zset1" but not "zset2" or "zset3".
```


#### :gear: zdiffWithScores

Returns the difference between the first sorted set and all the successive sorted sets, with the associated
scores.

| Method | Type |
| ---------- | ---------- |
| `zdiffWithScores` | `(keys: any[], options?: DecoderOption or undefined) => Promise<SortedSetDataType>` |

Parameters:

* `keys`: - The keys of the sorted sets.
* `options`: - (Optional) See 


Examples:

```typescript
await client.zadd("zset1", {"member1": 1.0, "member2": 2.0, "member3": 3.0});
await client.zadd("zset2", {"member2": 2.0});
await client.zadd("zset3", {"member3": 3.0});
const result = await client.zdiffWithScores(["zset1", "zset2", "zset3"]);
console.log(result); // Output: "member1" is in "zset1" but not "zset2" or "zset3"
// [{ element: "member1", score: 1.0 }]
```


#### :gear: zdiffstore

Calculates the difference between the first sorted set and all the successive sorted sets in `keys` and stores
the difference as a sorted set to `destination`, overwriting it if it already exists. Non-existent keys are
treated as empty sets.

| Method | Type |
| ---------- | ---------- |
| `zdiffstore` | `(destination: any, keys: any[]) => Promise<number>` |

Parameters:

* `destination`: - The key for the resulting sorted set.
* `keys`: - The keys of the sorted sets to compare.


Examples:

```typescript
await client.zadd("zset1", {"member1": 1.0, "member2": 2.0});
await client.zadd("zset2", {"member1": 1.0});
const result1 = await client.zdiffstore("zset3", ["zset1", "zset2"]);
console.log(result1); // Output: 1 - One member exists in "key1" but not "key2", and this member was stored in "zset3".

const result2 = await client.zrange("zset3", {start: 0, end: -1});
console.log(result2); // Output: ["member2"] - "member2" is now stored in "my_sorted_set".
```


#### :gear: zscore

Returns the score of `member` in the sorted set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `zscore` | `(key: any, member: any) => Promise<number or null>` |

Parameters:

* `key`: - The key of the sorted set.
* `member`: - The member whose score is to be retrieved.


Examples:

```typescript
// Example usage of the zscore method∂∂ to get the score of a member in a sorted set
const result = await client.zscore("my_sorted_set", "member");
console.log(result); // Output: 10.5 - Indicates that the score of "member" in the sorted set "my_sorted_set" is 10.5.
```
```typescript
// Example usage of the zscore method when the member does not exist in the sorted set
const result = await client.zscore("my_sorted_set", "non_existing_member");
console.log(result); // Output: null
```
```typescript
// Example usage of the zscore method with non existimng key
const result = await client.zscore("non_existing_set", "member");
console.log(result); // Output: null
```


#### :gear: zunionstore

Computes the union of sorted sets given by the specified `keys` and stores the result in `destination`.
If `destination` already exists, it is overwritten. Otherwise, a new sorted set will be created.
To get the result directly, see {@link zunionWithScores}.

| Method | Type |
| ---------- | ---------- |
| `zunionstore` | `(destination: any, keys: any[] or KeyWeight[], options?: { aggregationType?: AggregationType or undefined; } or undefined) => Promise<number>` |

Parameters:

* `destination`: - The key of the destination sorted set.
* `keys`: - The keys of the sorted sets with possible formats:
- `GlideString[]` - for keys only.
- `KeyWeight[]` - for weighted keys with their score multipliers.
* `options`: - (Optional) Additional parameters:
- (Optional) `aggregationType`: the aggregation strategy to apply when combining the scores of elements. See 


Examples:

```typescript
await client.zadd("key1", {"member1": 10.5, "member2": 8.2})
await client.zadd("key2", {"member1": 9.5})

// use `zunionstore` with default aggregation and weights
console.log(await client.zunionstore("my_sorted_set", ["key1", "key2"]))
// Output: 2 - Indicates that the sorted set "my_sorted_set" contains two elements.
console.log(await client.zrangeWithScores("my_sorted_set", {start: 0, stop: -1}))
// Output: {'member1': 20, 'member2': 8.2} - "member1" is now stored in "my_sorted_set" with score of 20 and "member2" with score of 8.2.
```
```typescript
// use `zunionstore` with default weights
console.log(await client.zunionstore("my_sorted_set", ["key1", "key2"], { aggregationType: AggregationType.MAX }))
// Output: 2 - Indicates that the sorted set "my_sorted_set" contains two elements, and each score is the maximum score between the sets.
console.log(await client.zrangeWithScores("my_sorted_set", {start: 0, stop: -1}))
// Output: {'member1': 10.5, 'member2': 8.2} - "member1" is now stored in "my_sorted_set" with score of 10.5 and "member2" with score of 8.2.
```
```typescript
// use `zunionstore` with default aggregation
console.log(await client.zunionstore("my_sorted_set", [["key1", 2], ["key2", 1]])) // Output: 2
console.log(await client.zrangeWithScores("my_sorted_set", {start: 0, stop: -1})) // Output: { member2: 16.4, member1: 30.5 }
```


#### :gear: zmscore

Returns the scores associated with the specified `members` in the sorted set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `zmscore` | `(key: any, members: any[]) => Promise<(number or null)[]>` |

Parameters:

* `key`: - The key of the sorted set.
* `members`: - A list of members in the sorted set.


Examples:

```typescript
const result = await client.zmscore("zset1", ["member1", "non_existent_member", "member2"]);
console.log(result); // Output: [1.0, null, 2.0] - "member1" has a score of 1.0, "non_existent_member" does not exist in the sorted set, and "member2" has a score of 2.0.
```


#### :gear: zcount

Returns the number of members in the sorted set stored at `key` with scores between `minScore` and `maxScore`.

| Method | Type |
| ---------- | ---------- |
| `zcount` | `(key: any, minScore: Boundary<number>, maxScore: Boundary<number>) => Promise<number>` |

Parameters:

* `key`: - The key of the sorted set.
* `minScore`: - The minimum score to count from. Can be positive/negative infinity, or specific score and inclusivity.
* `maxScore`: - The maximum score to count up to. Can be positive/negative infinity, or specific score and inclusivity.


Examples:

```typescript
// Example usage of the zcount method to count members in a sorted set within a score range
const result = await client.zcount("my_sorted_set", { value: 5.0, isInclusive: true }, InfBoundary.PositiveInfinity);
console.log(result); // Output: 2 - Indicates that there are 2 members with scores between 5.0 (inclusive) and +inf in the sorted set "my_sorted_set".
```
```typescript
// Example usage of the zcount method to count members in a sorted set within a score range
const result = await client.zcount("my_sorted_set", { value: 5.0, isInclusive: true }, { value: 10.0, isInclusive: false });
console.log(result); // Output: 1 - Indicates that there is one member with score between 5.0 (inclusive) and 10.0 (exclusive) in the sorted set "my_sorted_set".
```


#### :gear: zrange

Returns the specified range of elements in the sorted set stored at `key`.
`ZRANGE` can perform different types of range queries: by index (rank), by the score, or by lexicographical order.

To get the elements with their scores, see {@link zrangeWithScores}.

| Method | Type |
| ---------- | ---------- |
| `zrange` | `(key: any, rangeQuery: RangeByScore or RangeByLex or RangeByIndex, options?: ({ reverse?: boolean or undefined; } and DecoderOption) or undefined) => Promise<...>` |

Parameters:

* `key`: - The key of the sorted set.
* `rangeQuery`: - The range query object representing the type of range query to perform.
- For range queries by index (rank), use 
* `options`: - (Optional) Additional parameters:
- (Optional) `reverse`: if `true`, reverses the sorted set, with index `0` as the element with the highest score.
- (Optional) `decoder`: see 


Examples:

```typescript
// Example usage of zrange method to retrieve all members of a sorted set in ascending order
const result = await client.zrange("my_sorted_set", { start: 0, end: -1 });
console.log(result1); // Output: all members in ascending order
// ['member1', 'member2', 'member3']
```
```typescript
// Example usage of zrange method to retrieve members within a score range in descending order
const result = await client.zrange("my_sorted_set", {
             start: { value: 3, isInclusive: false },
             end: InfBoundary.NegativeInfinity,
             type: "byScore",
          }, { reverse: true });
console.log(result); // Output: members with scores within the range of negative infinity to 3, in descending order
// ['member2', 'member1']
```


#### :gear: zrangeWithScores

Returns the specified range of elements with their scores in the sorted set stored at `key`.
Similar to {@link ZRange } but with a `WITHSCORE` flag.

| Method | Type |
| ---------- | ---------- |
| `zrangeWithScores` | `(key: any, rangeQuery: RangeByScore or RangeByLex or RangeByIndex, options?: ({ reverse?: boolean or undefined; } and DecoderOption) or undefined) => Promise<...>` |

Parameters:

* `key`: - The key of the sorted set.
* `rangeQuery`: - The range query object representing the type of range query to perform.
- For range queries by index (rank), use 
* `options`: - (Optional) Additional parameters:
- (Optional) `reverse`: if `true`, reverses the sorted set, with index `0` as the element with the highest score.
- (Optional) `decoder`: see 


Examples:

```typescript
// Example usage of zrangeWithScores method to retrieve members within a score range with their scores
const result = await client.zrangeWithScores("my_sorted_set", {
             start: { value: 10, isInclusive: false },
             end: { value: 20, isInclusive: false },
             type: "byScore",
          });
console.log(result); // Output: members with scores between 10 and 20 with their scores
// [{ element: 'member1', score: 10.5 }, { element: 'member2', score: 15.2 }]
```
```typescript
// Example usage of zrangeWithScores method to retrieve members within a score range with their scores
const result = await client.zrangeWithScores("my_sorted_set", {
             start: { value: 3, isInclusive: false },
             end: InfBoundary.NegativeInfinity,
             type: "byScore",
          }, { reverse: true });
console.log(result); // Output: members with scores within the range of negative infinity to 3, with their scores
// [{ element: 'member7', score: 1.5 }, { element: 'member4', score: -2.0 }]
```


#### :gear: zrangeStore

Stores a specified range of elements from the sorted set at `source`, into a new
sorted set at `destination`. If `destination` doesn't exist, a new sorted
set is created; if it exists, it's overwritten.

| Method | Type |
| ---------- | ---------- |
| `zrangeStore` | `(destination: any, source: any, rangeQuery: RangeByScore or RangeByLex or RangeByIndex, reverse?: boolean) => Promise<number>` |

Parameters:

* `destination`: - The key for the destination sorted set.
* `source`: - The key of the source sorted set.
* `rangeQuery`: - The range query object representing the type of range query to perform.
- For range queries by index (rank), use 
* `reverse`: - If `true`, reverses the sorted set, with index `0` as the element with the highest score.


Examples:

```typescript
// Example usage of zrangeStore to retrieve and store all members of a sorted set in ascending order.
const result = await client.zrangeStore("destination_key", "my_sorted_set", { start: 0, end: -1 });
console.log(result); // Output: 7 - "destination_key" contains a sorted set with the 7 members from "my_sorted_set".
```
```typescript
// Example usage of zrangeStore method to retrieve members within a score range in ascending order and store in "destination_key"
const result = await client.zrangeStore("destination_key", "my_sorted_set", {
             start: InfBoundary.NegativeInfinity,
             end: { value: 3, isInclusive: false },
             type: "byScore",
          });
console.log(result); // Output: 5 - Stores 5 members with scores within the range of negative infinity to 3, in ascending order, in "destination_key".
```


#### :gear: zinterstore

Computes the intersection of sorted sets given by the specified `keys` and stores the result in `destination`.
If `destination` already exists, it is overwritten. Otherwise, a new sorted set will be created.
To get the result directly, see {@link zinterWithScores}.

| Method | Type |
| ---------- | ---------- |
| `zinterstore` | `(destination: any, keys: any[] or KeyWeight[], options?: { aggregationType?: AggregationType or undefined; } or undefined) => Promise<number>` |

Parameters:

* `destination`: - The key of the destination sorted set.
* `keys`: - The keys of the sorted sets with possible formats:
- `GlideString[]` - for keys only.
- `KeyWeight[]` - for weighted keys with score multipliers.
* `options`: - (Optional) Additional parameters:
- (Optional) `aggregationType`: the aggregation strategy to apply when combining the scores of elements. See 


Examples:

```typescript
await client.zadd("key1", {"member1": 10.5, "member2": 8.2})
await client.zadd("key2", {"member1": 9.5})

// use `zinterstore` with default aggregation and weights
console.log(await client.zinterstore("my_sorted_set", ["key1", "key2"]))
// Output: 1 - Indicates that the sorted set "my_sorted_set" contains one element.
console.log(await client.zrangeWithScores("my_sorted_set", {start: 0, end: -1}))
// Output: {'member1': 20} - "member1" is now stored in "my_sorted_set" with score of 20.

// use `zinterstore` with default weights
console.log(await client.zinterstore("my_sorted_set", ["key1", "key2"] , { aggregationType: AggregationType.MAX }))
// Output: 1 - Indicates that the sorted set "my_sorted_set" contains one element, and it's score is the maximum score between the sets.
console.log(await client.zrangeWithScores("my_sorted_set", {start: 0, end: -1}))
// Output: {'member1': 10.5} - "member1" is now stored in "my_sorted_set" with score of 10.5.
```


#### :gear: zinter

Computes the intersection of sorted sets given by the specified `keys` and returns a list of intersecting elements.
To get the scores as well, see {@link zinterWithScores}.
To store the result in a key as a sorted set, see {@link zinterStore }.

| Method | Type |
| ---------- | ---------- |
| `zinter` | `(keys: any[], options?: DecoderOption or undefined) => Promise<any[]>` |

Parameters:

* `keys`: - The keys of the sorted sets.
* `options`: - (Optional) See 


Examples:

```typescript
await client.zadd("key1", {"member1": 10.5, "member2": 8.2});
await client.zadd("key2", {"member1": 9.5});
const result = await client.zinter(["key1", "key2"]);
console.log(result); // Output: ['member1']
```


#### :gear: zinterWithScores

Computes the intersection of sorted sets given by the specified `keys` and returns a list of intersecting elements with scores.
To get the elements only, see {@link zinter}.
To store the result in a key as a sorted set, see {@link zinterStore }.

| Method | Type |
| ---------- | ---------- |
| `zinterWithScores` | `(keys: any[] or KeyWeight[], options?: ({ aggregationType?: AggregationType or undefined; } and DecoderOption) or undefined) => Promise<SortedSetDataType>` |

Parameters:

* `keys`: - The keys of the sorted sets with possible formats:
- `GlideString[]` - for keys only.
- `KeyWeight[]` - for weighted keys with score multipliers.
* `options`: - (Optional) Additional parameters:
- (Optional) `aggregationType`: the aggregation strategy to apply when combining the scores of elements.
If `aggregationType` is not specified, defaults to `AggregationType.SUM`. See 


Examples:

```typescript
await client.zadd("key1", {"member1": 10.5, "member2": 8.2});
await client.zadd("key2", {"member1": 9.5});
const result1 = await client.zinterWithScores(["key1", "key2"]);
console.log(result1); // Output: "member1" with score of 20 is the result
// [{ element: 'member1', score: 20 }]
const result2 = await client.zinterWithScores(["key1", "key2"], AggregationType.MAX)
console.log(result2); // Output: "member1" with score of 10.5 is the result
// [{ element: 'member1', score: 10.5 }]
```


#### :gear: zunion

Computes the union of sorted sets given by the specified `keys` and returns a list of union elements.

To get the scores as well, see {@link zunionWithScores}.
To store the result in a key as a sorted set, see {@link zunionStore }.

| Method | Type |
| ---------- | ---------- |
| `zunion` | `(keys: any[], options?: DecoderOption or undefined) => Promise<any[]>` |

Parameters:

* `keys`: - The keys of the sorted sets.
* `options`: - (Optional) See 


Examples:

```typescript
await client.zadd("key1", {"member1": 10.5, "member2": 8.2});
await client.zadd("key2", {"member1": 9.5});
const result = await client.zunion(["key1", "key2"]);
console.log(result); // Output: ['member1', 'member2']
```


#### :gear: zunionWithScores

Computes the intersection of sorted sets given by the specified `keys` and returns a list of union elements with scores.
To get the elements only, see {@link zunion}.

| Method | Type |
| ---------- | ---------- |
| `zunionWithScores` | `(keys: any[] or KeyWeight[], options?: ({ aggregationType?: AggregationType or undefined; } and DecoderOption) or undefined) => Promise<SortedSetDataType>` |

Parameters:

* `keys`: - The keys of the sorted sets with possible formats:
- string[] - for keys only.
- KeyWeight[] - for weighted keys with score multipliers.
* `options`: - (Optional) Additional parameters:
- (Optional) `aggregationType`: the aggregation strategy to apply when combining the scores of elements.
If `aggregationType` is not specified, defaults to `AggregationType.SUM`. See 


Examples:

```typescript
await client.zadd("key1", {"member1": 10.5, "member2": 8.2});
await client.zadd("key2", {"member1": 9.5});
const result1 = await client.zunionWithScores(["key1", "key2"]);
console.log(result1); // Output:
// [{ element: 'member1', score: 20 }, { element: 'member2', score: 8.2 }]
const result2 = await client.zunionWithScores(["key1", "key2"], "MAX");
console.log(result2); // Output:
// [{ element: 'member1', score: 10.5}, { element: 'member2', score: 8.2 }]
```


#### :gear: zrandmember

Returns a random member from the sorted set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `zrandmember` | `(key: any, options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `keys`: - The key of the sorted set.
* `options`: - (Optional) See 


Examples:

```typescript
const payload1 = await client.zrandmember("mySortedSet");
console.log(payload1); // Output: "Glide" (a random member from the set)
```
```typescript
const payload2 = await client.zrandmember("nonExistingSortedSet");
console.log(payload2); // Output: null since the sorted set does not exist.
```


#### :gear: zrandmemberWithCount

Returns random members from the sorted set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `zrandmemberWithCount` | `(key: any, count: number, options?: DecoderOption or undefined) => Promise<any[]>` |

Parameters:

* `keys`: - The key of the sorted set.
* `count`: - The number of members to return.
If `count` is positive, returns unique members.
If negative, allows for duplicates.
* `options`: - (Optional) See 


Examples:

```typescript
const payload1 = await client.zrandmemberWithCount("mySortedSet", -3);
console.log(payload1); // Output: ["Glide", "GLIDE", "node"]
```
```typescript
const payload2 = await client.zrandmemberWithCount("nonExistingKey", 3);
console.log(payload1); // Output: [] since the sorted set does not exist.
```


#### :gear: zrandmemberWithCountWithScores

Returns random members with scores from the sorted set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `zrandmemberWithCountWithScores` | `(key: any, count: number, options?: DecoderOption or undefined) => Promise<KeyWeight[]>` |

Parameters:

* `keys`: - The key of the sorted set.
* `count`: - The number of members to return.
If `count` is positive, returns unique members.
If negative, allows for duplicates.
* `options`: - (Optional) See 


Examples:

```typescript
const payload1 = await client.zrandmemberWithCountWithScore("mySortedSet", -3);
console.log(payload1); // Output: [["Glide", 1.0], ["GLIDE", 1.0], ["node", 2.0]]
```
```typescript
const payload2 = await client.zrandmemberWithCountWithScore("nonExistingKey", 3);
console.log(payload1); // Output: [] since the sorted set does not exist.
```


#### :gear: strlen

Returns the length of the string value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `strlen` | `(key: any) => Promise<number>` |

Parameters:

* `key`: - The key to check its length.


Examples:

```typescript
// Example usage of strlen method with an existing key
await client.set("key", "GLIDE");
const len1 = await client.strlen("key");
console.log(len1); // Output: 5
```
```typescript
// Example usage of strlen method with a non-existing key
const len2 = await client.strlen("non_existing_key");
console.log(len2); // Output: 0
```


#### :gear: type

Returns the string representation of the type of the value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `type` | `(key: any) => Promise<string>` |

Parameters:

* `key`: - The `key` to check its data type.


Examples:

```typescript
// Example usage of type method with a string value
await client.set("key", "value");
const type = await client.type("key");
console.log(type); // Output: 'string'
```
```typescript
// Example usage of type method with a list
await client.lpush("key", ["value"]);
const type = await client.type("key");
console.log(type); // Output: 'list'
```


#### :gear: zpopmin

Removes and returns the members with the lowest scores from the sorted set stored at `key`.
If `count` is provided, up to `count` members with the lowest scores are removed and returned.
Otherwise, only one member with the lowest score is removed and returned.

| Method | Type |
| ---------- | ---------- |
| `zpopmin` | `(key: any, options?: ({ count?: number or undefined; } and DecoderOption) or undefined) => Promise<SortedSetDataType>` |

Parameters:

* `key`: - The key of the sorted set.
* `options`: - (Optional) Additional parameters:
- (Optional) `count`: the maximum number of popped elements. If not specified, pops one member.
- (Optional) `decoder`: see 


Examples:

```typescript
// Example usage of zpopmin method to remove and return the member with the lowest score from a sorted set
const result = await client.zpopmin("my_sorted_set");
console.log(result); // Output:
// 'member1' with a score of 5.0 has been removed from the sorted set
// [{ element: 'member1', score: 5.0 }]
```
```typescript
// Example usage of zpopmin method to remove and return multiple members with the lowest scores from a sorted set
const result = await client.zpopmin("my_sorted_set", 2);
console.log(result); // Output:
// 'member3' with a score of 7.5 and 'member2' with a score of 8.0 have been removed from the sorted set
// [
//     { element: 'member3', score: 7.5 },
//     { element: 'member2', score: 8.0 }
// ]
```


#### :gear: bzpopmin

Blocks the connection until it removes and returns a member with the lowest score from the
first non-empty sorted set, with the given `key` being checked in the order they
are provided.
`BZPOPMIN` is the blocking variant of {@link zpopmin}.

| Method | Type |
| ---------- | ---------- |
| `bzpopmin` | `(keys: any[], timeout: number, options?: DecoderOption or undefined) => Promise<[any, any, number] or null>` |

Parameters:

* `keys`: - The keys of the sorted sets.
* `timeout`: - The number of seconds to wait for a blocking operation to complete. A value of
`0` will block indefinitely. Since 6.0.0: timeout is interpreted as a double instead of an integer.
* `options`: - (Optional) See 


Examples:

```typescript
const data = await client.bzpopmin(["zset1", "zset2"], 0.5);
console.log(data); // Output: ["zset1", "a", 2];
```


#### :gear: zpopmax

Removes and returns the members with the highest scores from the sorted set stored at `key`.
If `count` is provided, up to `count` members with the highest scores are removed and returned.
Otherwise, only one member with the highest score is removed and returned.

| Method | Type |
| ---------- | ---------- |
| `zpopmax` | `(key: any, options?: ({ count?: number or undefined; } and DecoderOption) or undefined) => Promise<SortedSetDataType>` |

Parameters:

* `key`: - The key of the sorted set.
* `options`: - (Optional) Additional parameters:
- (Optional) `count`: the maximum number of popped elements. If not specified, pops one member.
- (Optional) `decoder`: see 


Examples:

```typescript
// Example usage of zpopmax method to remove and return the member with the highest score from a sorted set
const result = await client.zpopmax("my_sorted_set");
console.log(result); // Output:
// 'member1' with a score of 10.0 has been removed from the sorted set
// [{ element: 'member1', score: 10.0 }]
```
```typescript
// Example usage of zpopmax method to remove and return multiple members with the highest scores from a sorted set
const result = await client.zpopmax("my_sorted_set", 2);
console.log(result); // Output:
// 'member3' with a score of 7.5 and 'member2' with a score of 8.0 have been removed from the sorted set
// [
//     { element: 'member3', score: 7.5 },
//     { element: 'member2', score: 8.0 }
// ]
```


#### :gear: bzpopmax

Blocks the connection until it removes and returns a member with the highest score from the
first non-empty sorted set, with the given `key` being checked in the order they
are provided.
`BZPOPMAX` is the blocking variant of {@link zpopmax}.

| Method | Type |
| ---------- | ---------- |
| `bzpopmax` | `(keys: any[], timeout: number, options?: DecoderOption or undefined) => Promise<[any, any, number] or null>` |

Parameters:

* `keys`: - The keys of the sorted sets.
* `timeout`: - The number of seconds to wait for a blocking operation to complete. A value of
`0` will block indefinitely. Since 6.0.0: timeout is interpreted as a double instead of an integer.
* `options`: - (Optional) See 


Examples:

```typescript
const data = await client.bzpopmax(["zset1", "zset2"], 0.5);
console.log(data); // Output: ["zset1", "c", 2];
```


#### :gear: pttl

Returns the remaining time to live of `key` that has a timeout, in milliseconds.

| Method | Type |
| ---------- | ---------- |
| `pttl` | `(key: any) => Promise<number>` |

Parameters:

* `key`: - The key to return its timeout.


Examples:

```typescript
// Example usage of pttl method with an existing key
const result = await client.pttl("my_key");
console.log(result); // Output: 5000 - Indicates that the key "my_key" has a remaining time to live of 5000 milliseconds.
```
```typescript
// Example usage of pttl method with a non-existing key
const result = await client.pttl("non_existing_key");
console.log(result); // Output: -2 - Indicates that the key "non_existing_key" does not exist.
```
```typescript
// Example usage of pttl method with an exisiting key that has no associated expire.
const result = await client.pttl("key");
console.log(result); // Output: -1 - Indicates that the key "key" has no associated expire.
```


#### :gear: zremRangeByRank

Removes all elements in the sorted set stored at `key` with rank between `start` and `end`.
Both `start` and `end` are zero-based indexes with 0 being the element with the lowest score.
These indexes can be negative numbers, where they indicate offsets starting at the element with the highest score.

| Method | Type |
| ---------- | ---------- |
| `zremRangeByRank` | `(key: any, start: number, end: number) => Promise<number>` |

Parameters:

* `key`: - The key of the sorted set.
* `start`: - The starting point of the range.
* `end`: - The end of the range.


Examples:

```typescript
// Example usage of zremRangeByRank method
const result = await client.zremRangeByRank("my_sorted_set", 0, 2);
console.log(result); // Output: 3 - Indicates that three elements have been removed from the sorted set "my_sorted_set" between ranks 0 and 2.
```


#### :gear: zremRangeByLex

Removes all elements in the sorted set stored at `key` with lexicographical order between `minLex` and `maxLex`.

| Method | Type |
| ---------- | ---------- |
| `zremRangeByLex` | `(key: any, minLex: Boundary<any>, maxLex: Boundary<any>) => Promise<number>` |

Parameters:

* `key`: - The key of the sorted set.
* `minLex`: - The minimum lex to count from. Can be negative infinity, or a specific lex and inclusivity.
* `maxLex`: - The maximum lex to count up to. Can be positive infinity, or a specific lex and inclusivity.


Examples:

```typescript
// Example usage of zremRangeByLex method to remove members from a sorted set based on lexicographical order range
const result = await client.zremRangeByLex("my_sorted_set", { value: "a", isInclusive: false }, { value: "e" });
console.log(result); // Output: 4 - Indicates that 4 members, with lexicographical values ranging from "a" (exclusive) to "e" (inclusive), have been removed from "my_sorted_set".
```
```typescript
// Example usage of zremRangeByLex method when the sorted set does not exist
const result = await client.zremRangeByLex("non_existing_sorted_set", InfBoundary.NegativeInfinity, { value: "e" });
console.log(result); // Output: 0 - Indicates that no elements were removed.
```


#### :gear: zremRangeByScore

Removes all elements in the sorted set stored at `key` with a score between `minScore` and `maxScore`.

| Method | Type |
| ---------- | ---------- |
| `zremRangeByScore` | `(key: any, minScore: Boundary<number>, maxScore: Boundary<number>) => Promise<number>` |

Parameters:

* `key`: - The key of the sorted set.
* `minScore`: - The minimum score to remove from. Can be negative infinity, or specific score and inclusivity.
* `maxScore`: - The maximum score to remove to. Can be positive infinity, or specific score and inclusivity.


Examples:

```typescript
// Example usage of zremRangeByScore method to remove members from a sorted set based on score range
const result = await client.zremRangeByScore("my_sorted_set", { value: 5.0, isInclusive: true }, InfBoundary.PositiveInfinity);
console.log(result); // Output: 2 - Indicates that 2 members with scores between 5.0 (inclusive) and +inf have been removed from the sorted set "my_sorted_set".
```
```typescript
// Example usage of zremRangeByScore method when the sorted set does not exist
const result = await client.zremRangeByScore("non_existing_sorted_set", { value: 5.0, isInclusive: true }, { value: 10.0, isInclusive: false });
console.log(result); // Output: 0 - Indicates that no members were removed as the sorted set "non_existing_sorted_set" does not exist.
```


#### :gear: zlexcount

Returns the number of members in the sorted set stored at 'key' with scores between 'minLex' and 'maxLex'.

| Method | Type |
| ---------- | ---------- |
| `zlexcount` | `(key: any, minLex: Boundary<any>, maxLex: Boundary<any>) => Promise<number>` |

Parameters:

* `key`: - The key of the sorted set.
* `minLex`: - The minimum lex to count from. Can be negative infinity, or a specific lex and inclusivity.
* `maxLex`: - The maximum lex to count up to. Can be positive infinity, or a specific lex and inclusivity.


Examples:

```typescript
const result = await client.zlexcount("my_sorted_set", {value: "c"}, InfBoundary.PositiveInfinity);
console.log(result); // Output: 2 - Indicates that there are 2 members with lex scores between "c" (inclusive) and positive infinity in the sorted set "my_sorted_set".
```
```typescript
const result = await client.zlexcount("my_sorted_set", {value: "c"}, {value: "k", isInclusive: false});
console.log(result); // Output: 1 - Indicates that there is one member with a lex score between "c" (inclusive) and "k" (exclusive) in the sorted set "my_sorted_set".
```


#### :gear: zrank

Returns the rank of `member` in the sorted set stored at `key`, with scores ordered from low to high.
To get the rank of `member` with its score, see {@link zrankWithScore}.

| Method | Type |
| ---------- | ---------- |
| `zrank` | `(key: any, member: any) => Promise<number or null>` |

Parameters:

* `key`: - The key of the sorted set.
* `member`: - The member whose rank is to be retrieved.


Examples:

```typescript
// Example usage of zrank method to retrieve the rank of a member in a sorted set
const result = await client.zrank("my_sorted_set", "member2");
console.log(result); // Output: 1 - Indicates that "member2" has the second-lowest score in the sorted set "my_sorted_set".
```
```typescript
// Example usage of zrank method with a non-existing member
const result = await client.zrank("my_sorted_set", "non_existing_member");
console.log(result); // Output: null - Indicates that "non_existing_member" is not present in the sorted set "my_sorted_set".
```


#### :gear: zrankWithScore

Returns the rank of `member` in the sorted set stored at `key` with its score, where scores are ordered from the lowest to highest.

| Method | Type |
| ---------- | ---------- |
| `zrankWithScore` | `(key: any, member: any) => Promise<[number, number] or null>` |

Parameters:

* `key`: - The key of the sorted set.
* `member`: - The member whose rank is to be retrieved.


Examples:

```typescript
// Example usage of zrank_withscore method to retrieve the rank and score of a member in a sorted set
const result = await client.zrank_withscore("my_sorted_set", "member2");
console.log(result); // Output: [1, 6.0] - Indicates that "member2" with score 6.0 has the second-lowest score in the sorted set "my_sorted_set".
```
```typescript
// Example usage of zrank_withscore method with a non-existing member
const result = await client.zrank_withscore("my_sorted_set", "non_existing_member");
console.log(result); // Output: null - Indicates that "non_existing_member" is not present in the sorted set "my_sorted_set".
```


#### :gear: zrevrank

Returns the rank of `member` in the sorted set stored at `key`, where
scores are ordered from the highest to lowest, starting from `0`.
To get the rank of `member` with its score, see {@link zrevrankWithScore}.

| Method | Type |
| ---------- | ---------- |
| `zrevrank` | `(key: any, member: any) => Promise<number or null>` |

Parameters:

* `key`: - The key of the sorted set.
* `member`: - The member whose rank is to be retrieved.


Examples:

```typescript
const result = await client.zrevrank("my_sorted_set", "member2");
console.log(result); // Output: 1 - Indicates that "member2" has the second-highest score in the sorted set "my_sorted_set".
```


#### :gear: zrevrankWithScore

Returns the rank of `member` in the sorted set stored at `key` with its
score, where scores are ordered from the highest to lowest, starting from `0`.

| Method | Type |
| ---------- | ---------- |
| `zrevrankWithScore` | `(key: any, member: any) => Promise<[number, number] or null>` |

Parameters:

* `key`: - The key of the sorted set.
* `member`: - The member whose rank is to be retrieved.


Examples:

```typescript
const result = await client.zrevankWithScore("my_sorted_set", "member2");
console.log(result); // Output: [1, 6.0] - Indicates that "member2" with score 6.0 has the second-highest score in the sorted set "my_sorted_set".
```


#### :gear: xadd

Adds an entry to the specified stream stored at `key`. If the `key` doesn't exist, the stream is created.

| Method | Type |
| ---------- | ---------- |
| `xadd` | `(key: any, values: [any, any][], options?: (StreamAddOptions and DecoderOption) or undefined) => Promise<any>` |

Parameters:

* `key`: - The key of the stream.
* `values`: - field-value pairs to be added to the entry.
* `options`: - options detailing how to add to the stream.
* `options`: - (Optional) See 


#### :gear: xdel

Removes the specified entries by id from a stream, and returns the number of entries deleted.

| Method | Type |
| ---------- | ---------- |
| `xdel` | `(key: any, ids: string[]) => Promise<number>` |

Parameters:

* `key`: - The key of the stream.
* `ids`: - An array of entry ids.


Examples:

```typescript
console.log(await client.xdel("key", ["1538561698944-0", "1538561698944-1"]));
// Output is 2 since the stream marked 2 entries as deleted.
```


#### :gear: xtrim

Trims the stream stored at `key` by evicting older entries.

| Method | Type |
| ---------- | ---------- |
| `xtrim` | `(key: any, options: StreamTrimOptions) => Promise<number>` |

Parameters:

* `key`: - the key of the stream
* `options`: - options detailing how to trim the stream.


#### :gear: xread

Reads entries from the given streams.

| Method | Type |
| ---------- | ---------- |
| `xread` | `(keys_and_ids: Record<string, string> or GlideRecord<string>, options?: (StreamReadOptions and DecoderOption) or undefined) => Promise<...>` |

Parameters:

* `keys_and_ids`: - An object of stream keys and entry IDs to read from.
* `options`: - (Optional) Parameters detailing how to read the stream - see 


Examples:

```typescript
const streamResults = await client.xread({"my_stream": "0-0", "writers": "0-0"});
console.log(result); // Output:
// [
//     {
//         key: "my_stream",
//         value: {
//             "1526984818136-0": [["duration", "1532"], ["event-id", "5"], ["user-id", "7782813"]],
//             "1526999352406-0": [["duration", "812"], ["event-id", "9"], ["user-id", "388234"]],
//         }
//     },
//     {
//         key: "writers",
//         value: {
//             "1526985676425-0": [["name", "Virginia"], ["surname", "Woolf"]],
//             "1526985685298-0": [["name", "Jane"], ["surname", "Austen"]],
//         }
//     }
// ]
```


#### :gear: xreadgroup

Reads entries from the given streams owned by a consumer group.

| Method | Type |
| ---------- | ---------- |
| `xreadgroup` | `(group: any, consumer: any, keys_and_ids: Record<string, string> or GlideRecord<string>, options?: (StreamReadOptions and { noAck?: boolean or undefined; } and DecoderOption) or undefined) => Promise<...>` |

Parameters:

* `group`: - The consumer group name.
* `consumer`: - The group consumer.
* `keys_and_ids`: - An object of stream keys and entry IDs to read from.
Use the special entry ID of `">"` to receive only new messages.
* `options`: - (Optional) Parameters detailing how to read the stream - see 


Examples:

```typescript
const streamResults = await client.xreadgroup("my_group", "my_consumer", {"my_stream": "0-0", "writers_stream": "0-0", "readers_stream", ">"});
console.log(result); // Output:
// [
//     {
//         key: "my_stream",
//         value: {
//             "1526984818136-0": [["duration", "1532"], ["event-id", "5"], ["user-id", "7782813"]],
//             "1526999352406-0": [["duration", "812"], ["event-id", "9"], ["user-id", "388234"]],
//         }
//     },
//     {
//         key: "writers_stream",
//         value: {
//             "1526985676425-0": [["name", "Virginia"], ["surname", "Woolf"]],
//             "1526985685298-0": null,                                          // entry was deleted
//         }
//     },
//     {
//         key: "readers_stream",                                                // stream is empty
//         value: {}
//     }
// ]
```


#### :gear: xlen

Returns the number of entries in the stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xlen` | `(key: any) => Promise<number>` |

Parameters:

* `key`: - The key of the stream.


Examples:

```typescript
const numEntries = await client.xlen("my_stream");
console.log(numEntries); // Output: 2 - "my_stream" contains 2 entries.
```


#### :gear: xpending

Returns stream message summary information for pending messages matching a given range of IDs.

| Method | Type |
| ---------- | ---------- |
| `xpending` | `(key: any, group: any) => Promise<[number, any, any, [any, number][]]>` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.


Examples:

```typescript
console.log(await client.xpending("my_stream", "my_group")); // Output:
// [
//     42,                            // The total number of pending messages
//     "1722643465939-0",             // The smallest ID among the pending messages
//     "1722643484626-0",             // The greatest ID among the pending messages
//     [                              // A 2D-`array` of every consumer in the group
//         [ "consumer1", "10" ],     // with at least one pending message, and the
//         [ "consumer2", "32" ],     // number of pending messages it has
//     ]
// ]
```


#### :gear: xpendingWithOptions

Returns an extended form of stream message information for pending messages matching a given range of IDs.

| Method | Type |
| ---------- | ---------- |
| `xpendingWithOptions` | `(key: any, group: any, options: StreamPendingOptions) => Promise<[any, any, number, number][]>` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.
* `options`: - Additional options to filter entries, see 


Examples:

```typescript
console.log(await client.xpending("my_stream", "my_group"), {
    start: { value: "0-1", isInclusive: true },
    end: InfBoundary.PositiveInfinity,
    count: 2,
    consumer: "consumer1"
}); // Output:
// [
//     [
//         "1722643465939-0",  // The ID of the message
//         "consumer1",        // The name of the consumer that fetched the message and has still to acknowledge it
//         174431,             // The number of milliseconds that elapsed since the last time this message was delivered to this consumer
//         1                   // The number of times this message was delivered
//     ],
//     [
//         "1722643484626-0",
//         "consumer1",
//         202231,
//         1
//     ]
// ]
```


#### :gear: xinfoConsumers

Returns the list of all consumers and their attributes for the given consumer group of the
stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xinfoConsumers` | `(key: any, group: any, options?: DecoderOption or undefined) => Promise<Record<string, any>[]>` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.
* `options`: - (Optional) See 


Examples:

```typescript
const result = await client.xinfoConsumers("my_stream", "my_group");
console.log(result); // Output:
// [
//     {
//         "name": "Alice",
//         "pending": 1,
//         "idle": 9104628,
//         "inactive": 18104698   // Added in 7.2.0
//     },
//     ...
// ]
```


#### :gear: xinfoGroups

Returns the list of all consumer groups and their attributes for the stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xinfoGroups` | `(key: any, options?: DecoderOption or undefined) => Promise<Record<string, any>[]>` |

Parameters:

* `key`: - The key of the stream.
* `options`: - (Optional) See 


Examples:

```typescript
const result = await client.xinfoGroups("my_stream");
console.log(result); // Output:
// [
//     {
//         "name": "mygroup",
//         "consumers": 2,
//         "pending": 2,
//         "last-delivered-id": "1638126030001-0",
//         "entries-read": 2,                       // Added in version 7.0.0
//         "lag": 0                                 // Added in version 7.0.0
//     },
//     {
//         "name": "some-other-group",
//         "consumers": 1,
//         "pending": 0,
//         "last-delivered-id": "0-0",
//         "entries-read": null,                    // Added in version 7.0.0
//         "lag": 1                                 // Added in version 7.0.0
//     }
// ]
```


#### :gear: xclaim

Changes the ownership of a pending message.

| Method | Type |
| ---------- | ---------- |
| `xclaim` | `(key: any, group: any, consumer: any, minIdleTime: number, ids: string[], options?: (StreamClaimOptions and DecoderOption) or undefined) => Promise<...>` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.
* `consumer`: - The group consumer.
* `minIdleTime`: - The minimum idle time for the message to be claimed.
* `ids`: - An array of entry ids.
* `options`: - (Optional) See 


Examples:

```typescript
const result = await client.xclaim("myStream", "myGroup", "myConsumer", 42,
    ["1-0", "2-0", "3-0"], { idle: 500, retryCount: 3, isForce: true });
console.log(result); // Output:
// {
//     "2-0": [["duration", "1532"], ["event-id", "5"], ["user-id", "7782813"]]
// }
```


#### :gear: xautoclaim

Transfers ownership of pending stream entries that match the specified criteria.

| Method | Type |
| ---------- | ---------- |
| `xautoclaim` | `(key: any, group: any, consumer: any, minIdleTime: number, start: string, options?: ({ count?: number or undefined; } and DecoderOption) or undefined) => Promise<[any, StreamEntryDataType, (any[] or undefined)?]>` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.
* `consumer`: - The group consumer.
* `minIdleTime`: - The minimum idle time for the message to be claimed.
* `start`: - Filters the claimed entries to those that have an ID equal or greater than the
specified value.
* `options`: - (Optional) Additional parameters:
- (Optional) `count`: the number of claimed entries.
- (Optional) `decoder`: see 


Examples:

```typescript
const result = await client.xautoclaim("myStream", "myGroup", "myConsumer", 42, "0-0", { count: 25 });
console.log(result); // Output:
// [
//     "1609338788321-0",                // value to be used as `start` argument
//                                       // for the next `xautoclaim` call
//     {
//         "1609338752495-0": [          // claimed entries
//             ["field 1", "value 1"],
//             ["field 2", "value 2"]
//         ]
//     },
//     [
//         "1594324506465-0",            // array of IDs of deleted messages,
//         "1594568784150-0"             // included in the response only on valkey 7.0.0 and above
//     ]
// ]
```


#### :gear: xautoclaimJustId

Transfers ownership of pending stream entries that match the specified criteria.

| Method | Type |
| ---------- | ---------- |
| `xautoclaimJustId` | `(key: any, group: any, consumer: any, minIdleTime: number, start: string, options?: { count?: number or undefined; } or undefined) => Promise<[string, string[], (string[] or undefined)?]>` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.
* `consumer`: - The group consumer.
* `minIdleTime`: - The minimum idle time for the message to be claimed.
* `start`: - Filters the claimed entries to those that have an ID equal or greater than the
specified value.
* `options`: - (Optional) Additional parameters:
- (Optional) `count`: limits the number of claimed entries to the specified value.


Examples:

```typescript
const result = await client.xautoclaim("myStream", "myGroup", "myConsumer", 42, "0-0", { count: 25 });
console.log(result); // Output:
// [
//     "1609338788321-0",                // value to be used as `start` argument
//                                       // for the next `xautoclaim` call
//     [
//         "1609338752495-0",            // claimed entries
//         "1609338752495-1",
//     ],
//     [
//         "1594324506465-0",            // array of IDs of deleted messages,
//         "1594568784150-0"             // included in the response only on valkey 7.0.0 and above
//     ]
// ]
```


#### :gear: xclaimJustId

Changes the ownership of a pending message. This function returns an `array` with
only the message/entry IDs, and is equivalent to using `JUSTID` in the Valkey API.

| Method | Type |
| ---------- | ---------- |
| `xclaimJustId` | `(key: any, group: any, consumer: any, minIdleTime: number, ids: string[], options?: StreamClaimOptions or undefined) => Promise<string[]>` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.
* `consumer`: - The group consumer.
* `minIdleTime`: - The minimum idle time for the message to be claimed.
* `ids`: - An array of entry ids.
* `options`: - (Optional) Stream claim options 


Examples:

```typescript
const result = await client.xclaimJustId("my_stream", "my_group", "my_consumer", 42,
    ["1-0", "2-0", "3-0"], { idle: 500, retryCount: 3, isForce: true });
console.log(result); // Output: [ "2-0", "3-0" ]
```


#### :gear: xgroupCreate

Creates a new consumer group uniquely identified by `groupname` for the stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xgroupCreate` | `(key: any, groupName: any, id: string, options?: StreamGroupOptions or undefined) => Promise<"OK">` |

Parameters:

* `key`: - The key of the stream.
* `groupName`: - The newly created consumer group name.
* `id`: - Stream entry ID that specifies the last delivered entry in the stream from the new
group’s perspective. The special ID `"$"` can be used to specify the last entry in the stream.


Examples:

```typescript
// Create the consumer group "mygroup", using zero as the starting ID:
console.log(await client.xgroupCreate("mystream", "mygroup", "0-0")); // Output is "OK"
```


#### :gear: xgroupDestroy

Destroys the consumer group `groupname` for the stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xgroupDestroy` | `(key: any, groupName: any) => Promise<boolean>` |

Parameters:

* `key`: - The key of the stream.
* `groupname`: - The newly created consumer group name.


Examples:

```typescript
// Destroys the consumer group "mygroup"
console.log(await client.xgroupDestroy("mystream", "mygroup")); // Output is true
```


#### :gear: xinfoStream

Returns information about the stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xinfoStream` | `(key: any, options?: ({ fullOptions?: number or boolean or undefined; } and DecoderOption) or undefined) => Promise<ReturnTypeXinfoStream>` |

Parameters:

* `key`: - The key of the stream.
* `options`: - (Optional) Additional parameters:
- (Optional) `fullOptions`: If `true`, returns verbose information with a limit of the first 10 PEL entries.
If `number` is specified, returns verbose information limiting the returned PEL entries.
If `0` is specified, returns verbose information with no limit.
- (Optional) `decoder`: see 


Examples:

```typescript
const infoResult = await client.xinfoStream("my_stream");
console.log(infoResult);
// Output: {
//   length: 2,
//   'radix-tree-keys': 1,
//   'radix-tree-nodes': 2,
//   'last-generated-id': '1719877599564-1',
//   'max-deleted-entry-id': '0-0',
//   'entries-added': 2,
//   'recorded-first-entry-id': '1719877599564-0',
//   'first-entry': [ '1719877599564-0', ['some_field", "some_value', ...] ],
//   'last-entry': [ '1719877599564-0', ['some_field", "some_value', ...] ],
//   groups: 1,
// }
```
```typescript
const infoResult = await client.xinfoStream("my_stream", true); // default limit of 10 entries
const infoResult = await client.xinfoStream("my_stream", 15); // limit of 15 entries
console.log(infoResult);
// Output: {
//   'length': 2,
//   'radix-tree-keys': 1,
//   'radix-tree-nodes': 2,
//   'last-generated-id': '1719877599564-1',
//   'max-deleted-entry-id': '0-0',
//   'entries-added': 2,
//   'recorded-first-entry-id': '1719877599564-0',
//   'entries': [ [ '1719877599564-0', ['some_field", "some_value', ...] ] ],
//   'groups': [ {
//     'name': 'group',
//     'last-delivered-id': '1719877599564-0',
//     'entries-read': 1,
//     'lag': 1,
//     'pel-count': 1,
//     'pending': [ [ '1719877599564-0', 'consumer', 1722624726802, 1 ] ],
//     'consumers': [ {
//         'name': 'consumer',
//         'seen-time': 1722624726802,
//         'active-time': 1722624726802,
//         'pel-count': 1,
//         'pending': [ [ '1719877599564-0', 'consumer', 1722624726802, 1 ] ],
//         }
//       ]
//     }
//   ]
// }
```


#### :gear: xgroupCreateConsumer

Creates a consumer named `consumerName` in the consumer group `groupName` for the stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xgroupCreateConsumer` | `(key: any, groupName: any, consumerName: any) => Promise<boolean>` |

Parameters:

* `key`: - The key of the stream.
* `groupName`: - The consumer group name.
* `consumerName`: - The newly created consumer.


Examples:

```typescript
// The consumer "myconsumer" was created in consumer group "mygroup" for the stream "mystream".
console.log(await client.xgroupCreateConsumer("mystream", "mygroup", "myconsumer")); // Output is true
```


#### :gear: xgroupDelConsumer

Deletes a consumer named `consumerName` in the consumer group `groupName` for the stream stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `xgroupDelConsumer` | `(key: any, groupName: any, consumerName: any) => Promise<number>` |

Parameters:

* `key`: - The key of the stream.
* `groupName`: - The consumer group name.
* `consumerName`: - The consumer to delete.


Examples:

```typescript
// Consumer "myconsumer" was deleted, and had 5 pending messages unclaimed.
console.log(await client.xgroupDelConsumer("mystream", "mygroup", "myconsumer")); // Output is 5
```


#### :gear: xack

Returns the number of messages that were successfully acknowledged by the consumer group member of a stream.
This command should be called on a pending message so that such message does not get processed again.

| Method | Type |
| ---------- | ---------- |
| `xack` | `(key: any, group: any, ids: string[]) => Promise<number>` |

Parameters:

* `key`: - The key of the stream.
* `group`: - The consumer group name.
* `ids`: - An array of entry ids.


Examples:

```typescript
const entryId = await client.xadd("mystream", ["myfield", "mydata"]);
// read messages from streamId
const readResult = await client.xreadgroup(["myfield", "mydata"], "mygroup", "my0consumer");
// acknowledge messages on stream
console.log(await client.xack("mystream", "mygroup", [entryId])); // Output: 1
```


#### :gear: xgroupSetId

Sets the last delivered ID for a consumer group.

| Method | Type |
| ---------- | ---------- |
| `xgroupSetId` | `(key: any, groupName: any, id: string, options?: { entriesRead?: number or undefined; } or undefined) => Promise<"OK">` |

Parameters:

* `key`: - The key of the stream.
* `groupName`: - The consumer group name.
* `id`: - The stream entry ID that should be set as the last delivered ID for the consumer group.
* `options`: - (Optional) Additional parameters:
- (Optional) `entriesRead`: the number of stream entries already read by the group.
This option can only be specified if you are using Valkey version 7.0.0 or above.


Examples:

```typescript
console.log(await client.xgroupSetId("mystream", "mygroup", "0", { entriesRead: 1 })); // Output is "OK"
```


#### :gear: lindex

Returns the element at index `index` in the list stored at `key`.
The index is zero-based, so 0 means the first element, 1 the second element and so on.
Negative indices can be used to designate elements starting at the tail of the list.
Here, -1 means the last element, -2 means the penultimate and so forth.

| Method | Type |
| ---------- | ---------- |
| `lindex` | `(key: any, index: number, options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `key`: - The `key` of the list.
* `index`: - The `index` of the element in the list to retrieve.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of lindex method to retrieve elements from a list by index
const result = await client.lindex("my_list", 0);
console.log(result); // Output: 'value1' - Returns the first element in the list stored at 'my_list'.
```
```typescript
// Example usage of lindex method to retrieve elements from a list by negative index
const result = await client.lindex("my_list", -1);
console.log(result); // Output: 'value3' - Returns the last element in the list stored at 'my_list'.
```


#### :gear: linsert

Inserts `element` in the list at `key` either before or after the `pivot`.

| Method | Type |
| ---------- | ---------- |
| `linsert` | `(key: any, position: InsertPosition, pivot: any, element: any) => Promise<number>` |

Parameters:

* `key`: - The key of the list.
* `position`: - The relative position to insert into - either `InsertPosition.Before` or
`InsertPosition.After` the `pivot`.
* `pivot`: - An element of the list.
* `element`: - The new element to insert.


Examples:

```typescript
const length = await client.linsert("my_list", InsertPosition.Before, "World", "There");
console.log(length); // Output: 2 - The list has a length of 2 after performing the insert.
```


#### :gear: persist

Removes the existing timeout on `key`, turning the key from volatile (a key with an expire set) to
persistent (a key that will never expire as no timeout is associated).

| Method | Type |
| ---------- | ---------- |
| `persist` | `(key: any) => Promise<boolean>` |

Parameters:

* `key`: - The key to remove the existing timeout on.


Examples:

```typescript
// Example usage of persist method to remove the timeout associated with a key
const result = await client.persist("my_key");
console.log(result); // Output: true - Indicates that the timeout associated with the key "my_key" was successfully removed.
```


#### :gear: rename

Renames `key` to `newkey`.
If `newkey` already exists it is overwritten.

| Method | Type |
| ---------- | ---------- |
| `rename` | `(key: any, newKey: any) => Promise<"OK">` |

Parameters:

* `key`: - The key to rename.
* `newKey`: - The new name of the key.


Examples:

```typescript
// Example usage of rename method to rename a key
await client.set("old_key", "value");
const result = await client.rename("old_key", "new_key");
console.log(result); // Output: OK - Indicates successful renaming of the key "old_key" to "new_key".
```


#### :gear: renamenx

Renames `key` to `newkey` if `newkey` does not yet exist.

| Method | Type |
| ---------- | ---------- |
| `renamenx` | `(key: any, newKey: any) => Promise<boolean>` |

Parameters:

* `key`: - The key to rename.
* `newKey`: - The new name of the key.


Examples:

```typescript
// Example usage of renamenx method to rename a key
await client.set("old_key", "value");
const result = await client.renamenx("old_key", "new_key");
console.log(result); // Output: true - Indicates successful renaming of the key "old_key" to "new_key".
```


#### :gear: brpop

Blocking list pop primitive.
Pop an element from the tail of the first list that is non-empty,
with the given `keys` being checked in the order that they are given.
Blocks the connection when there are no elements to pop from any of the given lists.

| Method | Type |
| ---------- | ---------- |
| `brpop` | `(keys: any[], timeout: number, options?: DecoderOption or undefined) => Promise<[any, any] or null>` |

Parameters:

* `keys`: - The `keys` of the lists to pop from.
* `timeout`: - The `timeout` in seconds.
* `options`: - (Optional) See 


Examples:

```typescript
// Example usage of brpop method to block and wait for elements from multiple lists
const result = await client.brpop(["list1", "list2"], 5);
console.log(result); // Output: ["list1", "element"] - Indicates an element "element" was popped from "list1".
```


#### :gear: blpop

Blocking list pop primitive.
Pop an element from the head of the first list that is non-empty,
with the given `keys` being checked in the order that they are given.
Blocks the connection when there are no elements to pop from any of the given lists.

| Method | Type |
| ---------- | ---------- |
| `blpop` | `(keys: any[], timeout: number, options?: DecoderOption or undefined) => Promise<[any, any] or null>` |

Parameters:

* `keys`: - The `keys` of the lists to pop from.
* `timeout`: - The `timeout` in seconds.
* `options`: - (Optional) See 


Examples:

```typescript
const result = await client.blpop(["list1", "list2"], 5);
console.log(result); // Output: ['list1', 'element']
```


#### :gear: pfadd

Adds all elements to the HyperLogLog data structure stored at the specified `key`.
Creates a new structure if the `key` does not exist.
When no elements are provided, and `key` exists and is a HyperLogLog, then no operation is performed.

| Method | Type |
| ---------- | ---------- |
| `pfadd` | `(key: any, elements: any[]) => Promise<number>` |

Parameters:

* `key`: - The key of the HyperLogLog data structure to add elements into.
* `elements`: - An array of members to add to the HyperLogLog stored at `key`.


Examples:

```typescript
const result = await client.pfadd("hll_1", ["a", "b", "c"]);
console.log(result); // Output: 1 - Indicates that a data structure was created or modified
const result = await client.pfadd("hll_2", []);
console.log(result); // Output: 1 - Indicates that a new empty data structure was created
```


#### :gear: pfcount

Estimates the cardinality of the data stored in a HyperLogLog structure for a single key or
calculates the combined cardinality of multiple keys by merging their HyperLogLogs temporarily.

| Method | Type |
| ---------- | ---------- |
| `pfcount` | `(keys: any[]) => Promise<number>` |

Parameters:

* `keys`: - The keys of the HyperLogLog data structures to be analyzed.


Examples:

```typescript
const result = await client.pfcount(["hll_1", "hll_2"]);
console.log(result); // Output: 4 - The approximated cardinality of the union of "hll_1" and "hll_2"
```


#### :gear: pfmerge

Merges multiple HyperLogLog values into a unique value. If the destination variable exists, it is
treated as one of the source HyperLogLog data sets, otherwise a new HyperLogLog is created.

| Method | Type |
| ---------- | ---------- |
| `pfmerge` | `(destination: any, sourceKeys: any[]) => Promise<"OK">` |

Parameters:

* `destination`: - The key of the destination HyperLogLog where the merged data sets will be stored.
* `sourceKeys`: - The keys of the HyperLogLog structures to be merged.


Examples:

```typescript
await client.pfadd("hll1", ["a", "b"]);
await client.pfadd("hll2", ["b", "c"]);
const result = await client.pfmerge("new_hll", ["hll1", "hll2"]);
console.log(result); // Output: OK  - The value of "hll1" merged with "hll2" was stored in "new_hll".
const count = await client.pfcount(["new_hll"]);
console.log(count); // Output: 3  - The approximated cardinality of "new_hll" is 3.
```


#### :gear: objectEncoding

Returns the internal encoding for the Valkey object stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `objectEncoding` | `(key: any) => Promise<string or null>` |

Parameters:

* `key`: - The `key` of the object to get the internal encoding of.


Examples:

```typescript
const result = await client.objectEncoding("my_hash");
console.log(result); // Output: "listpack"
```


#### :gear: objectFreq

Returns the logarithmic access frequency counter of a Valkey object stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `objectFreq` | `(key: any) => Promise<number or null>` |

Parameters:

* `key`: - The `key` of the object to get the logarithmic access frequency counter of.


Examples:

```typescript
const result = await client.objectFreq("my_hash");
console.log(result); // Output: 2 - The logarithmic access frequency counter of "my_hash".
```


#### :gear: objectIdletime

Returns the time in seconds since the last access to the value stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `objectIdletime` | `(key: any) => Promise<number or null>` |

Parameters:

* `key`: - The key of the object to get the idle time of.


Examples:

```typescript
const result = await client.objectIdletime("my_hash");
console.log(result); // Output: 13 - "my_hash" was last accessed 13 seconds ago.
```


#### :gear: objectRefcount

Returns the reference count of the object stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `objectRefcount` | `(key: any) => Promise<number or null>` |

Parameters:

* `key`: - The `key` of the object to get the reference count of.


Examples:

```typescript
const result = await client.objectRefcount("my_hash");
console.log(result); // Output: 2 - "my_hash" has a reference count of 2.
```


#### :gear: fcall

Invokes a previously loaded function.

| Method | Type |
| ---------- | ---------- |
| `fcall` | `(func: any, keys: any[], args: any[], options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `func`: - The function name.
* `keys`: - A list of `keys` accessed by the function. To ensure the correct execution of functions,
all names of keys that a function accesses must be explicitly provided as `keys`.
* `args`: - A list of `function` arguments and it should not represent names of keys.
* `options`: - (Optional) See 


Examples:

```typescript
const response = await client.fcall("Deep_Thought", [], []);
console.log(response); // Output: Returns the function's return value.
```


#### :gear: fcallReadonly

Invokes a previously loaded read-only function.

| Method | Type |
| ---------- | ---------- |
| `fcallReadonly` | `(func: any, keys: any[], args: any[], options?: DecoderOption or undefined) => Promise<any>` |

Parameters:

* `func`: - The function name.
* `keys`: - A list of `keys` accessed by the function. To ensure the correct execution of functions,
all names of keys that a function accesses must be explicitly provided as `keys`.
* `args`: - A list of `function` arguments and it should not represent names of keys.
* `options`: - (Optional) See 


Examples:

```typescript
const response = await client.fcallReadOnly("Deep_Thought", ["key1"], ["Answer", "to", "the",
           "Ultimate", "Question", "of", "Life,", "the", "Universe,", "and", "Everything"]);
console.log(response); // Output: 42 # The return value on the function that was executed.
```


#### :gear: lpos

Returns the index of the first occurrence of `element` inside the list specified by `key`. If no
match is found, `null` is returned. If the `count` option is specified, then the function returns
an `array` of indices of matching elements within the list.

| Method | Type |
| ---------- | ---------- |
| `lpos` | `(key: any, element: any, options?: LPosOptions or undefined) => Promise<number or number[] or null>` |

Parameters:

* `key`: - The name of the list.
* `element`: - The value to search for within the list.
* `options`: - (Optional) The LPOS options - see 


Examples:

```typescript
await client.rpush("myList", ["a", "b", "c", "d", "e", "e"]);
console.log(await client.lpos("myList", "e", { rank: 2 })); // Output: 5 - the second occurrence of "e" is at index 5.
console.log(await client.lpos("myList", "e", { count: 3 })); // Output: [ 4, 5 ] - indices for the occurrences of "e" in list "myList".
```


#### :gear: bitcount

Counts the number of set bits (population counting) in the string stored at `key`. The `options` argument can
optionally be provided to count the number of bits in a specific string interval.

| Method | Type |
| ---------- | ---------- |
| `bitcount` | `(key: any, options?: BitOffsetOptions or undefined) => Promise<number>` |

Parameters:

* `key`: - The key for the string to count the set bits of.
* `options`: - The offset options - see 


Examples:

```typescript
console.log(await client.bitcount("my_key1")); // Output: 2 - The string stored at "my_key1" contains 2 set bits.
console.log(await client.bitcount("my_key2", { start: 1 })); // Output: 8 - From the second to to the last bytes of the string stored at "my_key2" are contain 8 set bits.
console.log(await client.bitcount("my_key2", { start: 1, end: 3 })); // Output: 2 - The second to fourth bytes of the string stored at "my_key2" contain 2 set bits.
console.log(await client.bitcount("my_key3", { start: 1, end: 1, indexType: BitmapIndexType.BIT })); // Output: 1 - Indicates that the second bit of the string stored at "my_key3" is set.
console.log(await client.bitcount("my_key3", { start: -1, end: -1, indexType: BitmapIndexType.BIT })); // Output: 1 - Indicates that the last bit of the string stored at "my_key3" is set.
```


#### :gear: geoadd

Adds geospatial members with their positions to the specified sorted set stored at `key`.
If a member is already a part of the sorted set, its position is updated.

| Method | Type |
| ---------- | ---------- |
| `geoadd` | `(key: any, membersToGeospatialData: Map<any, GeospatialData>, options?: GeoAddOptions or undefined) => Promise<number>` |

Parameters:

* `key`: - The key of the sorted set.
* `membersToGeospatialData`: - A mapping of member names to their corresponding positions - see

* `options`: - The GeoAdd options - see 


Examples:

```typescript
const options = {updateMode: ConditionalChange.ONLY_IF_EXISTS, changed: true};
const membersToCoordinates = new Map<string, GeospatialData>([
     ["Palermo", { longitude: 13.361389, latitude: 38.115556 }],
]);
const num = await client.geoadd("mySortedSet", membersToCoordinates, options);
console.log(num); // Output: 1 - Indicates that the position of an existing member in the sorted set "mySortedSet" has been updated.
```


#### :gear: geosearch

Returns the members of a sorted set populated with geospatial information using {@link geoadd},
which are within the borders of the area specified by a given shape.

| Method | Type |
| ---------- | ---------- |
| `geosearch` | `(key: any, searchFrom: SearchOrigin, searchBy: GeoSearchShape, options?: (GeoSearchCommonResultOptions and { withCoord?: boolean or undefined; withDist?: boolean or undefined; withHash?: boolean or undefined; } and DecoderOption) or undefined) => Promise<...>` |

Parameters:

* `key`: - The key of the sorted set.
* `searchFrom`: - The query's center point options, could be one of:
- 
* `searchBy`: - The query's shape options, could be one of:
- 
* `options`: - (Optional) Parameters to request additional information and configure sorting/limiting the results,
see 


Examples:

```typescript
const data = new Map<GlideString, GeospatialData>([["Palermo", { longitude: 13.361389, latitude: 38.115556 }], ["Catania", { longitude: 15.087269, latitude: 37.502669 }]]);
await client.geoadd("mySortedSet", data);
// search for locations within 200 km circle around stored member named 'Palermo'
const result1 = await client.geosearch("mySortedSet", { member: "Palermo" }, { radius: 200, unit: GeoUnit.KILOMETERS });
console.log(result1); // Output: ['Palermo', 'Catania']

// search for locations in 200x300 mi rectangle centered at coordinate (15, 37), requesting additional info,
// limiting results by 2 best matches, ordered by ascending distance from the search area center
const result2 = await client.geosearch(
    "mySortedSet",
    { position: { longitude: 15, latitude: 37 } },
    { width: 200, height: 300, unit: GeoUnit.MILES },
    {
        sortOrder: SortOrder.ASC,
        count: 2,
        withCoord: true,
        withDist: true,
        withHash: true,
    },
);
console.log(result2); // Output:
// [
//     [
//         'Catania',                                       // location name
//         [
//             56.4413,                                     // distance
//             3479447370796909,                            // geohash of the location
//             [15.087267458438873, 37.50266842333162],     // coordinates of the location
//         ],
//     ],
//     [
//         'Palermo',
//         [
//             190.4424,
//             3479099956230698,
//             [13.361389338970184, 38.1155563954963],
//         ],
//     ],
// ]
```


#### :gear: geosearchstore

Searches for members in a sorted set stored at `source` representing geospatial data
within a circular or rectangular area and stores the result in `destination`.

If `destination` already exists, it is overwritten. Otherwise, a new sorted set will be created.

To get the result directly, see {@link geosearch}.

| Method | Type |
| ---------- | ---------- |
| `geosearchstore` | `(destination: any, source: any, searchFrom: SearchOrigin, searchBy: GeoSearchShape, options?: GeoSearchStoreResultOptions or undefined) => Promise<...>` |

Parameters:

* `destination`: - The key of the destination sorted set.
* `source`: - The key of the sorted set.
* `searchFrom`: - The query's center point options, could be one of:
- 
* `searchBy`: - The query's shape options, could be one of:
- 
* `options`: - (Optional) Parameters to request additional information and configure sorting/limiting the results,
see 


Examples:

```typescript
const data = new Map([["Palermo", { longitude: 13.361389, latitude: 38.115556 }], ["Catania", { longitude: 15.087269, latitude: 37.502669 }]]);
await client.geoadd("mySortedSet", data);
// search for locations within 200 km circle around stored member named 'Palermo' and store in `destination`:
await client.geosearchstore("destination", "mySortedSet", { member: "Palermo" }, { radius: 200, unit: GeoUnit.KILOMETERS });
// query the stored results
const result1 = await client.zrangeWithScores("destination", { start: 0, end: -1 });
console.log(result1); // Output:
// {
//     Palermo: 3479099956230698,   // geohash of the location is stored as element's score
//     Catania: 3479447370796909
// }

// search for locations in 200x300 mi rectangle centered at coordinate (15, 37), requesting to store distance instead of geohashes,
// limiting results by 2 best matches, ordered by ascending distance from the search area center
await client.geosearchstore(
    "destination",
    "mySortedSet",
    { position: { longitude: 15, latitude: 37 } },
    { width: 200, height: 300, unit: GeoUnit.MILES },
    {
        sortOrder: SortOrder.ASC,
        count: 2,
        storeDist: true,
    },
);
// query the stored results
const result2 = await client.zrangeWithScores("destination", { start: 0, end: -1 });
console.log(result2); // Output:
// {
//     Palermo: 190.4424,   // distance from the search area center is stored as element's score
//     Catania: 56.4413,    // the distance is measured in units used for the search query (miles)
// }
```


#### :gear: geopos

Returns the positions (longitude, latitude) of all the specified `members` of the
geospatial index represented by the sorted set at `key`.

| Method | Type |
| ---------- | ---------- |
| `geopos` | `(key: any, members: any[]) => Promise<([number, number] or null)[]>` |

Parameters:

* `key`: - The key of the sorted set.
* `members`: - The members for which to get the positions.


Examples:

```typescript
const data = new Map([["Palermo", { longitude: 13.361389, latitude: 38.115556 }], ["Catania", { longitude: 15.087269, latitude: 37.502669 }]]);
await client.geoadd("mySortedSet", data);
const result = await client.geopos("mySortedSet", ["Palermo", "Catania", "NonExisting"]);
// When added via GEOADD, the geospatial coordinates are converted into a 52 bit geohash, so the coordinates
// returned might not be exactly the same as the input values
console.log(result); // Output:
// [
//     [13.36138933897018433, 38.11555639549629859],
//     [15.08726745843887329, 37.50266842333162032],
//     null
// ]
```


#### :gear: zmpop

Pops member-score pairs from the first non-empty sorted set, with the given `keys`
being checked in the order they are provided.

| Method | Type |
| ---------- | ---------- |
| `zmpop` | `(keys: any[], modifier: ScoreFilter, options?: ({ count?: number or undefined; } and DecoderOption) or undefined) => Promise<[any, SortedSetDataType] or null>` |

Parameters:

* `keys`: - The keys of the sorted sets.
* `modifier`: - The element pop criteria - either 
* `options`: - (Optional) Additional parameters:
- (Optional) `count`: the maximum number of popped elements. If not specified, pops one member.
- (Optional) `decoder`: see 


Examples:

```typescript
await client.zadd("zSet1", { one: 1.0, two: 2.0, three: 3.0 });
await client.zadd("zSet2", { four: 4.0 });
console.log(await client.zmpop(["zSet1", "zSet2"], ScoreFilter.MAX, 2));
// Output:
// "three" with score 3 and "two" with score 2 were popped from "zSet1"
// [ "zSet1", [
//     { element: 'three', score: 3 },
//     { element: 'two', score: 2 }
// ] ]
```


#### :gear: bzmpop

Pops a member-score pair from the first non-empty sorted set, with the given `keys` being
checked in the order they are provided. Blocks the connection when there are no members
to pop from any of the given sorted sets. `BZMPOP` is the blocking variant of {@link zmpop}.

| Method | Type |
| ---------- | ---------- |
| `bzmpop` | `(keys: any[], modifier: ScoreFilter, timeout: number, options?: ({ count?: number or undefined; } and DecoderOption) or undefined) => Promise<[any, SortedSetDataType] or null>` |

Parameters:

* `keys`: - The keys of the sorted sets.
* `modifier`: - The element pop criteria - either 
* `timeout`: - The number of seconds to wait for a blocking operation to complete.
A value of 0 will block indefinitely.
* `options`: - (Optional) Additional parameters:
- (Optional) `count`: the maximum number of popped elements. If not specified, pops one member.
- (Optional) `decoder`: see 


Examples:

```typescript
await client.zadd("zSet1", { one: 1.0, two: 2.0, three: 3.0 });
await client.zadd("zSet2", { four: 4.0 });
console.log(await client.bzmpop(["zSet1", "zSet2"], ScoreFilter.MAX, 0.1, 2));
// Output:
// "three" with score 3 and "two" with score 2 were popped from "zSet1"
// [ "zSet1", [
//     { element: 'three', score: 3 },
//     { element: 'two', score: 2 }
// ] ]
```


#### :gear: zincrby

Increments the score of `member` in the sorted set stored at `key` by `increment`.
If `member` does not exist in the sorted set, it is added with `increment` as its score.
If `key` does not exist, a new sorted set is created with the specified member as its sole member.

| Method | Type |
| ---------- | ---------- |
| `zincrby` | `(key: any, increment: number, member: any) => Promise<number>` |

Parameters:

* `key`: - The key of the sorted set.
* `increment`: - The score increment.
* `member`: - A member of the sorted set.


Examples:

```typescript
// Example usage of zincrBy method to increment the value of a member's score
await client.zadd("my_sorted_set", {"member": 10.5, "member2": 8.2});
console.log(await client.zincrby("my_sorted_set", 1.2, "member"));
// Output: 11.7 - The member existed in the set before score was altered, the new score is 11.7.
console.log(await client.zincrby("my_sorted_set", -1.7, "member"));
// Output: 10.0 - Negative increment, decrements the score.
console.log(await client.zincrby("my_sorted_set", 5.5, "non_existing_member"));
// Output: 5.5 - A new member is added to the sorted set with the score of 5.5.
```


#### :gear: zscan

Iterates incrementally over a sorted set.

| Method | Type |
| ---------- | ---------- |
| `zscan` | `(key: any, cursor: string, options?: (BaseScanOptions and { readonly noScores?: boolean or undefined; } and DecoderOption) or undefined) => Promise<[string, any[]]>` |

Parameters:

* `key`: - The key of the sorted set.
* `cursor`: - The cursor that points to the next iteration of results. A value of `"0"` indicates the start of
the search.
* `options`: - (Optional) The `zscan` options - see 


Examples:

```typescript
// Assume "key1" contains a sorted set with multiple members
let cursor = "0";
do {
     const result = await client.zscan(key1, cursor, {
         match: "*",
         count: 5,
     });
     cursor = result[0];
     console.log("Cursor: ", cursor);
     console.log("Members: ", result[1]);
} while (cursor !== "0");
// The output of the code above is something similar to:
// Cursor:  123
// Members:  ['value 163', '163', 'value 114', '114', 'value 25', '25', 'value 82', '82', 'value 64', '64']
// Cursor:  47
// Members:  ['value 39', '39', 'value 127', '127', 'value 43', '43', 'value 139', '139', 'value 211', '211']
// Cursor:  0
// Members:  ['value 55', '55', 'value 24', '24', 'value 90', '90', 'value 113', '113']
```
```typescript
// Zscan with no scores
let newCursor = "0";
let result = [];

do {
     result = await client.zscan(key1, newCursor, {
         match: "*",
         count: 5,
         noScores: true,
     });
     newCursor = result[0];
     console.log("Cursor: ", newCursor);
     console.log("Members: ", result[1]);
} while (newCursor !== "0");
// The output of the code above is something similar to:
// Cursor:  123
// Members:  ['value 163', 'value 114', 'value 25', 'value 82', 'value 64']
// Cursor:  47
// Members:  ['value 39', 'value 127', 'value 43', 'value 139', 'value 211']
// Cursor:  0
// Members:  ['value 55', 'value 24' 'value 90', 'value 113']
```


#### :gear: geodist

Returns the distance between `member1` and `member2` saved in the geospatial index stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `geodist` | `(key: any, member1: any, member2: any, options?: { unit?: GeoUnit or undefined; } or undefined) => Promise<number or null>` |

Parameters:

* `key`: - The key of the sorted set.
* `member1`: - The name of the first member.
* `member2`: - The name of the second member.
* `options`: - (Optional) Additional parameters:
- (Optional) `unit`: the unit of distance measurement - see 


Examples:

```typescript
const result = await client.geodist("mySortedSet", "Place1", "Place2", { unit: GeoUnit.KILOMETERS });
console.log(num); // Output: the distance between Place1 and Place2.
```


#### :gear: geohash

Returns the `GeoHash` strings representing the positions of all the specified `members` in the sorted set stored at `key`.

| Method | Type |
| ---------- | ---------- |
| `geohash` | `(key: any, members: any[]) => Promise<(string or null)[]>` |

Parameters:

* `key`: - The key of the sorted set.
* `members`: - The array of members whose `GeoHash` strings are to be retrieved.


Examples:

```typescript
const result = await client.geohash("mySortedSet", ["Palermo", "Catania", "NonExisting"]);
console.log(result); // Output: ["sqc8b49rny0", "sqdtr74hyu0", null]
```


#### :gear: lcs

Returns all the longest common subsequences combined between strings stored at `key1` and `key2`.

| Method | Type |
| ---------- | ---------- |
| `lcs` | `(key1: any, key2: any, options?: DecoderOption or undefined) => Promise<string>` |

Parameters:

* `key1`: - The key that stores the first string.
* `key2`: - The key that stores the second string.
* `options`: - (Optional) See 


Examples:

```typescript
await client.mset({"testKey1": "abcd", "testKey2": "axcd"});
const result = await client.lcs("testKey1", "testKey2");
console.log(result); // Output: 'acd'
```


#### :gear: lcsLen

Returns the total length of all the longest common subsequences between strings stored at `key1` and `key2`.

| Method | Type |
| ---------- | ---------- |
| `lcsLen` | `(key1: any, key2: any, options?: DecoderOption or undefined) => Promise<number>` |

Parameters:

* `key1`: - The key that stores the first string.
* `key2`: - The key that stores the second string.
* `options`: - (Optional) See 


Examples:

```typescript
await client.mset({"testKey1": "abcd", "testKey2": "axcd"});
const result = await client.lcsLen("testKey1", "testKey2");
console.log(result); // Output: 3
```


#### :gear: lcsIdx

Returns the indices and lengths of the longest common subsequences between strings stored at
`key1` and `key2`.

| Method | Type |
| ---------- | ---------- |
| `lcsIdx` | `(key1: any, key2: any, options?: { withMatchLen?: boolean or undefined; minMatchLen?: number or undefined; } or undefined) => Promise<Record<string, number or (number or [number, number])[][]>>` |

Parameters:

* `key1`: - The key that stores the first string.
* `key2`: - The key that stores the second string.
* `options`: - (Optional) Additional parameters:
- (Optional) `withMatchLen`: if `true`, include the length of the substring matched for the each match.
- (Optional) `minMatchLen`: the minimum length of matches to include in the result.


Examples:

```typescript
await client.mset({"key1": "ohmytext", "key2": "mynewtext"});
const result = await client.lcsIdx("key1", "key2");
console.log(result); // Output:
{
    "matches" :
    [
        [              // first substring match is "text"
            [4, 7],    // in `key1` it is located between indices 4 and 7
            [5, 8],    // and in `key2` - in between 5 and 8
            4          // the match length, returned if `withMatchLen` set to `true`
        ],
        [              // second substring match is "my"
            [2, 3],    // in `key1` it is located between indices 2 and 3
            [0, 1],    // and in `key2` - in between 0 and 1
            2          // the match length, returned if `withMatchLen` set to `true`
        ]
    ],
    "len" : 6          // total length of the all matches found
}
```


#### :gear: touch

Updates the last access time of the specified keys.

| Method | Type |
| ---------- | ---------- |
| `touch` | `(keys: any[]) => Promise<number>` |

Parameters:

* `keys`: - The keys to update the last access time of.


Examples:

```typescript
await client.set("key1", "value1");
await client.set("key2", "value2");
const result = await client.touch(["key1", "key2", "nonExistingKey"]);
console.log(result); // Output: 2 - The last access time of 2 keys has been updated.
```


#### :gear: watch

Marks the given keys to be watched for conditional execution of a transaction. Transactions
will only execute commands if the watched keys are not modified before execution of the
transaction. Executing a transaction will automatically flush all previously watched keys.

| Method | Type |
| ---------- | ---------- |
| `watch` | `(keys: any[]) => Promise<"OK">` |

Parameters:

* `keys`: - The keys to watch.


Examples:

```typescript
const response = await client.watch(["sampleKey"]);
console.log(response); // Output: "OK"
const transaction = new Transaction().set("SampleKey", "foobar");
const result = await client.exec(transaction);
console.log(result); // Output: "OK" - Executes successfully and keys are unwatched.
```
```typescript
const response = await client.watch(["sampleKey"]);
console.log(response); // Output: "OK"
const transaction = new Transaction().set("SampleKey", "foobar");
await client.set("sampleKey", "hello world");
const result = await client.exec(transaction);
console.log(result); // Output: null - null is returned when the watched key is modified before transaction execution.
```


#### :gear: wait

Blocks the current client until all the previous write commands are successfully transferred and
acknowledged by at least `numreplicas` of replicas. If `timeout` is reached, the command returns
the number of replicas that were not yet reached.

| Method | Type |
| ---------- | ---------- |
| `wait` | `(numreplicas: number, timeout: number) => Promise<number>` |

Parameters:

* `numreplicas`: - The number of replicas to reach.
* `timeout`: - The timeout value specified in milliseconds. A value of 0 will block indefinitely.


Examples:

```typescript
await client.set(key, value);
let response = await client.wait(1, 1000);
console.log(response); // Output: return 1 when a replica is reached or 0 if 1000ms is reached.
```


#### :gear: setrange

Overwrites part of the string stored at `key`, starting at the specified byte `offset`,
for the entire length of `value`. If the `offset` is larger than the current length of the string at `key`,
the string is padded with zero bytes to make `offset` fit. Creates the `key` if it doesn't exist.

| Method | Type |
| ---------- | ---------- |
| `setrange` | `(key: any, offset: number, value: any) => Promise<number>` |

Parameters:

* `key`: - The key of the string to update.
* `offset`: - The byte position in the string where `value` should be written.
* `value`: - The string written with `offset`.


Examples:

```typescript
const len = await client.setrange("key", 6, "GLIDE");
console.log(len); // Output: 11 - New key was created with length of 11 symbols
const value = await client.get("key");
console.log(result); // Output: "\0\0\0\0\0\0GLIDE" - The string was padded with zero bytes
```


#### :gear: append

Appends a `value` to a `key`. If `key` does not exist it is created and set as an empty string,
so `APPEND` will be similar to {@link set} in this special case.

| Method | Type |
| ---------- | ---------- |
| `append` | `(key: any, value: any) => Promise<number>` |

Parameters:

* `key`: - The key of the string.
* `value`: - The key of the string.


Examples:

```typescript
const len = await client.append("key", "Hello");
console.log(len);
    // Output: 5 - Indicates that "Hello" has been appended to the value of "key", which was initially
    // empty, resulting in a new value of "Hello" with a length of 5 - similar to the set operation.
len = await client.append("key", " world");
console.log(result);
    // Output: 11 - Indicates that " world" has been appended to the value of "key", resulting in a
    // new value of "Hello world" with a length of 11.
```


#### :gear: lmpop

Pops one or more elements from the first non-empty list from the provided `keys`.

| Method | Type |
| ---------- | ---------- |
| `lmpop` | `(keys: any[], direction: ListDirection, options?: ({ count?: number or undefined; } and DecoderOption) or undefined) => Promise<{ key: any; elements: any[]; } or null>` |

Parameters:

* `keys`: - An array of keys.
* `direction`: - The direction based on which elements are popped from - see 
* `options`: - (Optional) Additional parameters:
- (Optional) `count`: the maximum number of popped elements. If not specified, pops one member.
- (Optional) `decoder`: see 


Examples:

```typescript
await client.lpush("testKey", ["one", "two", "three"]);
await client.lpush("testKey2", ["five", "six", "seven"]);
const result = await client.lmpop(["testKey", "testKey2"], ListDirection.LEFT, 1L);
console.log(result); // Output: { key: "testKey", elements: ["three"] }
```


#### :gear: blmpop

Blocks the connection until it pops one or more elements from the first non-empty list from the
provided `key`. `BLMPOP` is the blocking variant of {@link lmpop}.

| Method | Type |
| ---------- | ---------- |
| `blmpop` | `(keys: any[], direction: ListDirection, timeout: number, options?: ({ count?: number or undefined; } and DecoderOption) or undefined) => Promise<{ key: any; elements: any[]; } or null>` |

Parameters:

* `keys`: - An array of keys.
* `direction`: - The direction based on which elements are popped from - see 
* `timeout`: - The number of seconds to wait for a blocking operation to complete. A value of `0` will block indefinitely.
* `options`: - (Optional) Additional parameters:
- (Optional) `count`: the maximum number of popped elements. If not specified, pops one member.
- (Optional) `decoder`: see 


Examples:

```typescript
await client.lpush("testKey", ["one", "two", "three"]);
await client.lpush("testKey2", ["five", "six", "seven"]);
const result = await client.blmpop(["testKey", "testKey2"], ListDirection.LEFT, 0.1, 1);
console.log(result"testKey"); // Output: { key: "testKey", elements: ["three"] }
```


#### :gear: pubsubChannels

Lists the currently active channels.
The command is routed to all nodes, and aggregates the response to a single array.

| Method | Type |
| ---------- | ---------- |
| `pubsubChannels` | `(options?: ({ pattern?: any; } and DecoderOption) or undefined) => Promise<any[]>` |

Parameters:

* `options`: - (Optional) Additional parameters:
- (Optional) `pattern`: A glob-style pattern to match active channels.
If not provided, all active channels are returned.
- (Optional) `decoder`: see 


Examples:

```typescript
const channels = await client.pubsubChannels();
console.log(channels); // Output: ["channel1", "channel2"]

const newsChannels = await client.pubsubChannels("news.*");
console.log(newsChannels); // Output: ["news.sports", "news.weather"]
```


#### :gear: pubsubNumPat

Returns the number of unique patterns that are subscribed to by clients.

Note: This is the total number of unique patterns all the clients are subscribed to,
not the count of clients subscribed to patterns.
The command is routed to all nodes, and aggregates the response to the sum of all pattern subscriptions.

| Method | Type |
| ---------- | ---------- |
| `pubsubNumPat` | `() => Promise<number>` |

Examples:

```typescript
const patternCount = await client.pubsubNumpat();
console.log(patternCount); // Output: 3
```


#### :gear: pubsubNumSub

Returns the number of subscribers (exclusive of clients subscribed to patterns) for the specified channels.

| Method | Type |
| ---------- | ---------- |
| `pubsubNumSub` | `(channels: any[], options?: DecoderOption or undefined) => Promise<{ channel: any; numSub: number; }[]>` |

Parameters:

* `channels`: - The list of channels to query for the number of subscribers.
* `options`: - (Optional) see 


Examples:

```typescript
const result1 = await client.pubsubNumsub(["channel1", "channel2"]);
console.log(result1); // Output:
// [{ channel: "channel1", numSub: 3}, { channel: "channel2", numSub: 5 }]

const result2 = await client.pubsubNumsub([]);
console.log(result2); // Output: []
```


#### :gear: sort

Sorts the elements in the list, set, or sorted set at `key` and returns the result.

The `sort` command can be used to sort elements based on different criteria and
apply transformations on sorted elements.

To store the result into a new key, see {@link sortStore}.

| Method | Type |
| ---------- | ---------- |
| `sort` | `(key: any, options?: (SortOptions and DecoderOption) or undefined) => Promise<any[]>` |

Parameters:

* `key`: - The key of the list, set, or sorted set to be sorted.
* `options`: - (Optional) The 


Examples:

```typescript
await client.hset("user:1", new Map([["name", "Alice"], ["age", "30"]]));
await client.hset("user:2", new Map([["name", "Bob"], ["age", "25"]]));
await client.lpush("user_ids", ["2", "1"]);
const result = await client.sort("user_ids", { byPattern: "user:*->age", getPattern: ["user:*->name"] });
console.log(result); // Output: [ 'Bob', 'Alice' ] - Returns a list of the names sorted by age
```


#### :gear: sortReadOnly

Sorts the elements in the list, set, or sorted set at `key` and returns the result.

The `sortReadOnly` command can be used to sort elements based on different criteria and
apply transformations on sorted elements.

This command is routed depending on the client's {@link ReadFrom} strategy.

| Method | Type |
| ---------- | ---------- |
| `sortReadOnly` | `(key: any, options?: (SortOptions and DecoderOption) or undefined) => Promise<any[]>` |

Parameters:

* `key`: - The key of the list, set, or sorted set to be sorted.
* `options`: - (Optional) The 


Examples:

```typescript
await client.hset("user:1", new Map([["name", "Alice"], ["age", "30"]]));
await client.hset("user:2", new Map([["name", "Bob"], ["age", "25"]]));
await client.lpush("user_ids", ["2", "1"]);
const result = await client.sortReadOnly("user_ids", { byPattern: "user:*->age", getPattern: ["user:*->name"] });
console.log(result); // Output: [ 'Bob', 'Alice' ] - Returns a list of the names sorted by age
```


#### :gear: sortStore

Sorts the elements in the list, set, or sorted set at `key` and stores the result in
`destination`.

The `sort` command can be used to sort elements based on different criteria and
apply transformations on sorted elements, and store the result in a new key.

To get the sort result without storing it into a key, see {@link sort} or {@link sortReadOnly}.

| Method | Type |
| ---------- | ---------- |
| `sortStore` | `(key: any, destination: any, options?: SortOptions or undefined) => Promise<number>` |

Parameters:

* `key`: - The key of the list, set, or sorted set to be sorted.
* `destination`: - The key where the sorted result will be stored.
* `options`: - (Optional) The 


Examples:

```typescript
await client.hset("user:1", new Map([["name", "Alice"], ["age", "30"]]));
await client.hset("user:2", new Map([["name", "Bob"], ["age", "25"]]));
await client.lpush("user_ids", ["2", "1"]);
const sortedElements = await client.sortStore("user_ids", "sortedList", { byPattern: "user:*->age", getPattern: ["user:*->name"] });
console.log(sortedElements); // Output: 2 - number of elements sorted and stored
console.log(await client.lrange("sortedList", 0, -1)); // Output: [ 'Bob', 'Alice' ] - Returns a list of the names sorted by age stored in `sortedList`
```


#### :gear: close

Terminate the client by closing all associated resources, including the socket and any active promises.
All open promises will be closed with an exception.

| Method | Type |
| ---------- | ---------- |
| `close` | `(errorMessage?: string or undefined) => void` |

Parameters:

* `errorMessage`: - If defined, this error message will be passed along with the exceptions when closing all open promises.


#### :gear: getStatistics

Return a statistics

| Method | Type |
| ---------- | ---------- |
| `getStatistics` | `() => object` |

## :nut_and_bolt: Enum

- [InfoOptions](#gear-infooptions)
- [BitwiseOperation](#gear-bitwiseoperation)
- [BitOverflowControl](#gear-bitoverflowcontrol)
- [ListDirection](#gear-listdirection)
- [ExpireOptions](#gear-expireoptions)
- [UpdateByScore](#gear-updatebyscore)
- [InfBoundary](#gear-infboundary)
- [InsertPosition](#gear-insertposition)
- [FunctionRestorePolicy](#gear-functionrestorepolicy)
- [BitmapIndexType](#gear-bitmapindextype)
- [FlushMode](#gear-flushmode)
- [ConditionalChange](#gear-conditionalchange)
- [GeoUnit](#gear-geounit)
- [SortOrder](#gear-sortorder)
- [ScoreFilter](#gear-scorefilter)
- [TimeUnit](#gear-timeunit)
- [ProtocolVersion](#gear-protocolversion)
- [Decoder](#gear-decoder)
- [ObjectType](#gear-objecttype)

### :gear: InfoOptions

INFO option: a specific section of information:
When no parameter is provided, the default option is assumed.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `Server` | `"server"` | SERVER: General information about the server |
| `Clients` | `"clients"` | CLIENTS: Client connections section |
| `Memory` | `"memory"` | MEMORY: Memory consumption related information |
| `Persistence` | `"persistence"` | PERSISTENCE: RDB and AOF related information |
| `Stats` | `"stats"` | STATS: General statistics |
| `Replication` | `"replication"` | REPLICATION: Master/replica replication information |
| `Cpu` | `"cpu"` | CPU: CPU consumption statistics |
| `Commandstats` | `"commandstats"` | COMMANDSTATS: Valkey command statistics |
| `Latencystats` | `"latencystats"` | LATENCYSTATS: Valkey command latency percentile distribution statistics |
| `Sentinel` | `"sentinel"` | SENTINEL: Valkey Sentinel section (only applicable to Sentinel instances) |
| `Cluster` | `"cluster"` | CLUSTER: Valkey Cluster section |
| `Modules` | `"modules"` | MODULES: Modules section |
| `Keyspace` | `"keyspace"` | KEYSPACE: Database related statistics |
| `Errorstats` | `"errorstats"` | ERRORSTATS: Valkey error statistics |
| `All` | `"all"` | ALL: Return all sections (excluding module generated ones) |
| `Default` | `"default"` | DEFAULT: Return only the default set of sections |
| `Everything` | `"everything"` | EVERYTHING: Includes all and modules |


### :gear: BitwiseOperation

Enumeration defining the bitwise operation to use in the {@link BaseClient.bitopbitop} command. Specifies the
bitwise operation to perform between the passed in keys.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `AND` | `"AND"` |  |
| `OR` | `"OR"` |  |
| `XOR` | `"XOR"` |  |
| `NOT` | `"NOT"` |  |


### :gear: BitOverflowControl

Enumeration specifying bit overflow controls for the {@link BaseClient.bitfieldbitfield} command.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `WRAP` | `"WRAP"` | Performs modulo when overflows occur with unsigned encoding. When overflows occur with signed encoding, the value restarts at the most negative value. When underflows occur with signed encoding, the value restarts at the most positive value. |
| `SAT` | `"SAT"` | Underflows remain set to the minimum value, and overflows remain set to the maximum value. |
| `FAIL` | `"FAIL"` | Returns `None` when overflows occur. |


### :gear: ListDirection

Enumeration representing element popping or adding direction for the List Based Commands.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `LEFT` | `"LEFT"` | Represents the option that elements should be popped from or added to the left side of a list. |
| `RIGHT` | `"RIGHT"` | Represents the option that elements should be popped from or added to the right side of a list. |


### :gear: ExpireOptions



| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `HasNoExpiry` | `"NX"` | `HasNoExpiry` - Sets expiry only when the key has no expiry. |
| `HasExistingExpiry` | `"XX"` | `HasExistingExpiry` - Sets expiry only when the key has an existing expiry. |
| `NewExpiryGreaterThanCurrent` | `"GT"` | `NewExpiryGreaterThanCurrent` - Sets expiry only when the new expiry is greater than current one. |
| `NewExpiryLessThanCurrent` | `"LT"` | `NewExpiryLessThanCurrent` - Sets expiry only when the new expiry is less than current one. |


### :gear: UpdateByScore

Options for updating elements of a sorted set key.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `LESS_THAN` | `"LT"` | Only update existing elements if the new score is less than the current score. |
| `GREATER_THAN` | `"GT"` | Only update existing elements if the new score is greater than the current score. |


### :gear: InfBoundary



| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `PositiveInfinity` | `"+"` | Positive infinity bound. |
| `NegativeInfinity` | `"-"` | Negative infinity bound. |


### :gear: InsertPosition

Defines where to insert new elements into a list.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `Before` | `"before"` | Insert new element before the pivot. |
| `After` | `"after"` | Insert new element after the pivot. |


### :gear: FunctionRestorePolicy

Option for `FUNCTION RESTORE` command: {@link GlideClient.functionRestore} and
{@link GlideClusterClient.functionRestore}.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `APPEND` | `"APPEND"` | Appends the restored libraries to the existing libraries and aborts on collision. This is the default policy. |
| `FLUSH` | `"FLUSH"` | Deletes all existing libraries before restoring the payload. |
| `REPLACE` | `"REPLACE"` | Appends the restored libraries to the existing libraries, replacing any existing ones in case of name collisions. Note that this policy doesn't prevent function name collisions, only libraries. |


### :gear: BitmapIndexType

Enumeration specifying if index arguments are BYTE indexes or BIT indexes.
Can be specified in {@link BitOffsetOptions}, which is an optional argument to the {@link BaseClient.bitcountbitcount} command.
Can also be specified as an optional argument to the {@link BaseClient.bitposInverval bitposInterval} command.

since - Valkey version 7.0.0.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `BYTE` | `"BYTE"` | Specifies that provided indexes are byte indexes. |
| `BIT` | `"BIT"` | Specifies that provided indexes are bit indexes. |


### :gear: FlushMode

Defines flushing mode for {@link GlideClient.flushall}, {@link GlideClusterClient.flushall},
     {@link GlideClient.functionFlush}, {@link GlideClusterClient.functionFlush},
     {@link GlideClient.flushdb} and {@link GlideClusterClient.flushdb} commands.

See https://valkey.io/commands/flushall/ and https://valkey.io/commands/flushdb/ for details.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `SYNC` | `"SYNC"` | Flushes synchronously.  since Valkey version 6.2.0. |
| `ASYNC` | `"ASYNC"` | Flushes asynchronously. |


### :gear: ConditionalChange

An optional condition to the {@link BaseClient.geoaddgeoadd},
{@link BaseClient.zaddzadd} and {@link BaseClient.setset} commands.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `ONLY_IF_EXISTS` | `"XX"` | Only update elements that already exist. Don't add new elements. Equivalent to `XX` in the Valkey API. |
| `ONLY_IF_DOES_NOT_EXIST` | `"NX"` | Only add new elements. Don't update already existing elements. Equivalent to `NX` in the Valkey API. |


### :gear: GeoUnit

Enumeration representing distance units options.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `METERS` | `"m"` | Represents distance in meters. |
| `KILOMETERS` | `"km"` | Represents distance in kilometers. |
| `MILES` | `"mi"` | Represents distance in miles. |
| `FEET` | `"ft"` | Represents distance in feet. |


### :gear: SortOrder

Defines the sort order for nested results.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `ASC` | `"ASC"` | Sort by ascending order. |
| `DESC` | `"DESC"` | Sort by descending order. |


### :gear: ScoreFilter

Mandatory option for zmpop.
Defines which elements to pop from the sorted set.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `MAX` | `"MAX"` | Pop elements with the highest scores. |
| `MIN` | `"MIN"` | Pop elements with the lowest scores. |


### :gear: TimeUnit

Time unit representation which is used in optional arguments for {@link BaseClient.getexgetex} and {@link BaseClient.setset} command.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `Seconds` | `"EX"` | Set the specified expire time, in seconds. Equivalent to `EX` in the VALKEY API. |
| `Milliseconds` | `"PX"` | Set the specified expire time, in milliseconds. Equivalent to `PX` in the VALKEY API. |
| `UnixSeconds` | `"EXAT"` | Set the specified Unix time at which the key will expire, in seconds. Equivalent to `EXAT` in the VALKEY API. |
| `UnixMilliseconds` | `"PXAT"` | Set the specified Unix time at which the key will expire, in milliseconds. Equivalent to `PXAT` in the VALKEY API. |


### :gear: ProtocolVersion



| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `RESP2` | `connection_request.ProtocolVersion.RESP2` | Use RESP2 to communicate with the server nodes. |
| `RESP3` | `connection_request.ProtocolVersion.RESP3` | Use RESP3 to communicate with the server nodes. |


### :gear: Decoder

Enum representing the different types of decoders.

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `Bytes` | `` | Decodes the response into a buffer array. |
| `String` | `` | Decodes the response into a string. |


### :gear: ObjectType

Enum of Valkey data types
`STRING`
`LIST`
`SET`
`ZSET`
`HASH`
`STREAM`

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `STRING` | `"String"` |  |
| `LIST` | `"List"` |  |
| `SET` | `"Set"` |  |
| `ZSET` | `"ZSet"` |  |
| `HASH` | `"Hash"` |  |
| `STREAM` | `"Stream"` |  |

