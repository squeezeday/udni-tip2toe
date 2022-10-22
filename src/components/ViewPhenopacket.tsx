import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PhenopacketEntity } from '../types';

export default function ViewPhenopacket() {
  const { id } = useParams();
  const [phenoPacket, setPhenoPacket] = useState<
    PhenopacketEntity | undefined
  >();

  useEffect(() => {
    async function load() {
      const url = `${import.meta.env.VITE_APIURL}/api/v1/phenopacket/${id}`;
      const ret = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      const res = (await ret.json()) as PhenopacketEntity;
      setPhenoPacket(res);
    }
    load();
  }, [id]);

  return (
    <div className="container max-w-5xl p-4 py-8">
      {phenoPacket ? (
        <>
          <h1 className="mb-2">UDP ID # {phenoPacket?.subject?.id}</h1>
          <p className="text-slate-400 text-xs">
            Phenopacket ID: {phenoPacket?._id}
          </p>
          {phenoPacket?.files ? (
            <>
              <h2 className="mt-8">Files</h2>
              <ul className="">
                {phenoPacket.files?.map((file) => (
                  <li key={file.uri}>
                    <a href={file.uri} target="_blank">
                      {file.uri}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <h2 className="mt-8">Phenotypic Features</h2>
          <div className="md:flex flex-row">
            <div className="flex-1">
              <h3>Yes</h3>
              {phenoPacket.phenotypicFeatures
                ?.filter((x) => !x.excluded)
                .map((phenotypicFeature) => (
                  <div key={phenotypicFeature.type?.id}>
                    <p>
                      <strong>{phenotypicFeature.type?.id}</strong>{' '}
                      {phenotypicFeature.type?.label}
                    </p>
                  </div>
                ))}
            </div>
            <div className="flex-1">
              <h3>No</h3>
              {phenoPacket.phenotypicFeatures
                ?.filter((x) => x.excluded)
                .map((phenotypicFeature) => (
                  <div key={phenotypicFeature.type?.id}>
                    <p>
                      <strong>{phenotypicFeature.type?.id}</strong>{' '}
                      {phenotypicFeature.type?.label}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>Not found</h2>
        </>
      )}
    </div>
  );
}
